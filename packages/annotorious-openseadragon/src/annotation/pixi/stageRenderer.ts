import * as PIXI from 'pixi.js';
import RBush from 'rbush'
import OpenSeadragon from 'openseadragon';
import { ShapeType } from '@annotorious/annotorious';
import type { AnnotationState, DrawingStyle, DrawingStyleExpression, Filter, Selection } from '@annotorious/core';
import type { Ellipse, ImageAnnotation, Polygon, Rectangle, Shape } from '@annotorious/annotorious';

const DEFAULT_FILL = 0x1a73e8;
const DEFAULT_ALPHA = 0.25;

// If scale has changed by more than UPDATE_SCALE_THRESHOLD in log scale, all annotations are redrawn
const UPDATE_SCALE_THRESHOLD = 0.20;

// If move has changed by more than UPDATE_MOVE_THRESHOLD, all annotations are redrawn
const UPDATE_MOVE_THRESHOLD = 0.25;

// Extra offset for updating annotations in view
const OFFSET_SEARCH = 0.30;

interface AnnotationShape {

  annotation: ImageAnnotation;

  fill: PIXI.Graphics;

  stroke: PIXI.Graphics;

  strokeWidth: number;

  drawFn: (g: PIXI.Graphics) => void;
}
export class StageRenderer {
  // Likewise, if scale has not changed, counter-scaling is also skipped
  private lastScale: number = 0;

  // Likewise, if center has not changed, counter-translation is also skipped
  private lastCenter: OpenSeadragon.Point = new OpenSeadragon.Point(undefined, undefined);

  // RBush tree for fast annotation lookup (spatial search)
  private annotationTree = new RBush<{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    annotationId: string;
  }>(16);

  // Keep track of which annotations have been updated
  private isAnnotationUpdated = new Map<string, boolean>();

  // Update annotations in view
  private updateAnnotationShape = (viewportBounds: OpenSeadragon.Rect, shapes: Map<String, AnnotationShape>, fn: (shape: AnnotationShape) => void) => {
    if (shapes.size === 0) return;

    const offsetX = viewportBounds.width * OFFSET_SEARCH;
    const offsetY = viewportBounds.height * OFFSET_SEARCH;

    const updateAnnotations = this.annotationTree.search({
      minX: viewportBounds.x - offsetX,
      minY: viewportBounds.y - offsetY,
      maxX: viewportBounds.x + viewportBounds.width + offsetX,
      maxY: viewportBounds.y + viewportBounds.height + offsetY
    })

    updateAnnotations.forEach(({ annotationId }) => {
      const shape = shapes.get(annotationId);
      if (shape && !this.isAnnotationUpdated.get(annotationId)) {
        fn(shape);

        this.isAnnotationUpdated.set(annotationId, true);
      }
    });

  }

  // Remove annotation from RBush tree
  private removeAnnotationFromTree = (annotation: ImageAnnotation) => {
    this.annotationTree.remove({
      minX: annotation.target.selector.geometry.bounds.minX,
      minY: annotation.target.selector.geometry.bounds.minY,
      maxX: annotation.target.selector.geometry.bounds.maxX,
      maxY: annotation.target.selector.geometry.bounds.maxY,
      annotationId: annotation.id
    }, (a, b) => a.annotationId === b.annotationId)
  }

  private getGraphicsStyle = (style?: DrawingStyle) => {
    const fillStyle = {
      tint: style?.fill ? new PIXI.Color(style.fill).toNumber() : DEFAULT_FILL,
      alpha: style?.fillOpacity === undefined ? DEFAULT_ALPHA : Math.min(style.fillOpacity, 1)
    };

    const strokeStyle = {
      tint: style?.stroke && new PIXI.Color(style.stroke).toNumber(),
      alpha: style?.strokeOpacity === undefined ? (style?.stroke ? 1 : 0) : Math.min(style.strokeOpacity, 1),
      lineWidth: style?.stroke ? style?.strokeWidth || 1 : 0
    }

    return { fillStyle, strokeStyle };
  }

  private drawShape = <T extends Shape>(fn: (s: T, g: PIXI.Graphics) => void) => (container: PIXI.Container, shape: T, style?: DrawingStyle) => {
    const { fillStyle, strokeStyle } = this.getGraphicsStyle(style);

    const fillGraphics = new PIXI.Graphics();
    fn(shape, fillGraphics);
    fillGraphics.fill(0xffffff)
    fillGraphics.tint = fillStyle.tint;
    fillGraphics.alpha = fillStyle.alpha;

    container.addChild(fillGraphics);

    const lineWidth = strokeStyle.lineWidth / this.lastScale;

    const strokeGraphics = new PIXI.Graphics();
    fn(shape, strokeGraphics);
    strokeGraphics.stroke({
      color: 0xffffff,
      width: lineWidth,
      alpha: 1,
      alignment: 0.5,
    })
    strokeGraphics.tint = strokeStyle.tint || 0xFFFFFF;
    strokeGraphics.alpha = strokeStyle.alpha;

    container.addChild(strokeGraphics);

    return { fill: fillGraphics, stroke: strokeGraphics, strokeWidth: strokeStyle.lineWidth, drawFn: (graphics: PIXI.Graphics) => fn(shape, graphics) };
  }

  private drawEllipse = this.drawShape((ellipse: Ellipse, g: PIXI.Graphics) => {
    const { cx, cy, rx, ry } = ellipse.geometry;
    g.ellipse(cx, cy, rx, ry)
  });

  private drawPolygon = this.drawShape((polygon: Polygon, g: PIXI.Graphics) => {
    const flattend = polygon.geometry.points.reduce((flat, xy) => ([...flat, ...xy]), []);
    g.poly(flattend);
  });

  private drawRectangle = this.drawShape((rectangle: Rectangle, g: PIXI.Graphics) => {
    const { x, y, w, h } = rectangle.geometry;
    g.rect(x, y, w, h);
  });

  private getCurrentScale = (viewer: OpenSeadragon.Viewer) => {
    const containerWidth = viewer.viewport.getContainerSize().x;
    const zoom = viewer.viewport.getZoom(true);
    return zoom * containerWidth / viewer.world.getContentFactor();
  }

  private redrawStage = (
    viewer: OpenSeadragon.Viewer,
    container: PIXI.Container,
    shapes: Map<String, AnnotationShape>,
    renderer: PIXI.Renderer<PIXI.ICanvas>
  ) => () => {
    const viewportBounds = viewer.viewport.viewportToImageRectangle(viewer.viewport.getBounds(true));
    const scale = this.getCurrentScale(viewer);
    const center = viewportBounds.getCenter();

    // console.log(Math.log(viewer.viewport.getZoom(true)))

    if (scale !== this.lastScale) {
      if (Math.abs(Math.log(scale / this.lastScale)) > UPDATE_SCALE_THRESHOLD) {
        this.isAnnotationUpdated.clear()

        this.updateAnnotationShape(viewportBounds, shapes, ({ stroke, strokeWidth, drawFn }) => {
          stroke.clear()
          drawFn(stroke);
          stroke.stroke({
            color: 0xffffff,
            width: strokeWidth / scale,
            alpha: 1,
            alignment: 0.5,
          })
        })

        this.lastScale = scale;
      }
    }

    if (!center.equals(this.lastCenter)) {
      const thresholdX = viewportBounds.width * UPDATE_MOVE_THRESHOLD;
      const thresholdY = viewportBounds.height * UPDATE_MOVE_THRESHOLD;

      if (Math.abs(center.x - this.lastCenter.x) > thresholdX || Math.abs(center.y - this.lastCenter.y) > thresholdY) {
        this.updateAnnotationShape(viewportBounds, shapes, ({ stroke, strokeWidth, drawFn }) => {
          stroke.clear()
          drawFn(stroke);
          stroke.stroke({
            color: 0xffffff,
            width: strokeWidth / scale,
            alpha: 1,
            alignment: 0.5,
          })
        });

        this.lastCenter = center;
      }

    }

    const rotation = Math.PI * viewer.viewport.getRotation() / 180;

    const dx = - viewportBounds.x * scale;
    const dy = - viewportBounds.y * scale;

    let offsetX: number, offsetY: number;

    if (rotation > 0 && rotation <= Math.PI / 2) {
      offsetX = viewportBounds.height * scale;
      offsetY = 0;
    } else if (rotation > Math.PI / 2 && rotation <= Math.PI) {
      offsetX = viewportBounds.width * scale;
      offsetY = viewportBounds.height * scale;
    } else if (rotation > Math.PI && rotation <= Math.PI * 1.5) {
      offsetX = 0;
      offsetY = viewportBounds.width * scale;
    } else {
      offsetX = 0;
      offsetY = 0;
    }

    container.position.x = offsetX + dx * Math.cos(rotation) - dy * Math.sin(rotation);
    container.position.y = offsetY + dx * Math.sin(rotation) + dy * Math.cos(rotation);
    container.scale.set(scale, scale);
    container.rotation = rotation;

    renderer.render(container);
  }

  createStage = async (viewer: OpenSeadragon.Viewer, canvas: HTMLCanvasElement) => {
    const container = new PIXI.Container();

    const renderer = await PIXI.autoDetectRenderer({
      width: canvas.width,
      height: canvas.height,
      backgroundAlpha: 0,
      canvas: canvas,
      antialias: true,
      resolution: 2,
    });

    // Lookup table: shapes and annotations by annotation ID
    const annotationShapes = new Map<string, AnnotationShape>();

    // Current selection (if any)
    let selectedIds = new Set<string>();

    // Current hover (if any)
    let hovered: string | undefined;

    // Current style (if any)
    let style: DrawingStyleExpression<ImageAnnotation> | undefined = undefined;

    this.lastScale = this.getCurrentScale(viewer);

    const addAnnotation = (annotation: ImageAnnotation, state?: AnnotationState) => {
      const { selector } = annotation.target;

      const s = typeof style == 'function' ? style(annotation, state) : style;

      let rendered: { fill: PIXI.Graphics, stroke: PIXI.Graphics, strokeWidth: number, drawFn: (g: PIXI.Graphics) => void } | undefined;

      if (selector.type === ShapeType.RECTANGLE) {
        rendered = this.drawRectangle(container, selector as Rectangle, s);
      } else if (selector.type === ShapeType.POLYGON) {
        rendered = this.drawPolygon(container, selector as Polygon, s);
      } else if (selector.type === ShapeType.ELLIPSE) {
        rendered = this.drawEllipse(container, selector as Ellipse, s);
      } else {
        console.warn(`Unsupported shape type: ${selector.type}`)
      }

      if (rendered) {
        this.annotationTree.insert({
          minX: selector.geometry.bounds.minX,
          minY: selector.geometry.bounds.minY,
          maxX: selector.geometry.bounds.maxX,
          maxY: selector.geometry.bounds.maxY,
          annotationId: annotation.id
        });

        annotationShapes.set(annotation.id, { annotation, ...rendered });
      }
    }

    const removeAnnotation = (annotation: ImageAnnotation) => {
      const rendered = annotationShapes.get(annotation.id);
      if (rendered) {
        this.removeAnnotationFromTree(annotation);
        annotationShapes.delete(annotation.id);
        rendered.fill.destroy();
        rendered.stroke.destroy();
      }
    }

    const updateAnnotation = (oldValue: ImageAnnotation, newValue: ImageAnnotation, state?: AnnotationState) => {
      const rendered = annotationShapes.get(oldValue.id);

      if (rendered) {
        this.removeAnnotationFromTree(oldValue);
        annotationShapes.delete(oldValue.id);
        rendered.fill.destroy();
        rendered.stroke.destroy();

        addAnnotation(newValue, state);
      }
    }

    const redrawAnnotation = (id: string, state?: AnnotationState) => {
      const rendered = annotationShapes.get(id);
      if (rendered) {

        this.removeAnnotationFromTree(rendered.annotation);
        annotationShapes.delete(id);
        rendered.fill.destroy();
        rendered.stroke.destroy();

        addAnnotation(rendered.annotation, state);
      }
    }

    const resize = (width: number, height: number) => {
      renderer.resize(width, height);
      renderer.render(container);
    }

    const setFilter = (filter?: Filter<ImageAnnotation>) => {
      const { children } = container;

      annotationShapes.forEach(({ fill, stroke, annotation }) => {
        // Note: selected annotation always remains visible
        const visible = filter ?
          selectedIds.has(annotation.id) || filter(annotation) :
          true;

        if (visible && !(children.includes(fill))) {
          container.addChild(fill);
          container.addChild(stroke);
        } else if (!visible && children.includes(fill)) {
          container.removeChild(fill);
          container.removeChild(stroke)
        }
      });

      renderer.render(container);
    }

    const setHovered = (annotationId?: string) => {
      if (hovered === annotationId) return;

      // Unhover current, if any
      if (hovered)
        redrawAnnotation(hovered, { selected: selectedIds.has(hovered) });

      // Set next hover
      if (annotationId)
        redrawAnnotation(annotationId, { selected: selectedIds.has(annotationId), hovered: true });

      hovered = annotationId;

      renderer.render(container);
    }

    const setSelected = (selection: Selection) => {
      const nextIds = selection.selected.map(s => s.id);

      const toSelect =
        nextIds.filter(id => !selectedIds.has(id));

      const toDeselect = [...selectedIds]
        .filter(id => !nextIds.includes(id));

      [...toSelect, ...toDeselect].forEach(id =>
        redrawAnnotation(id, { selected: nextIds.includes(id), hovered: id === hovered }));

      selectedIds = new Set(nextIds);

      renderer.render(container);
    }

    const setStyle = (s?: DrawingStyleExpression<ImageAnnotation>) => {
      if (typeof s === 'function') {
        annotationShapes.forEach(({ annotation, fill, stroke, strokeWidth, drawFn }, _) => {
          const { fillStyle, strokeStyle } = this.getGraphicsStyle(s(annotation));

          fill.tint = fillStyle.tint;
          fill.alpha = fillStyle.alpha;

          stroke.tint = strokeStyle.tint || 0xFFFFFF;
          stroke.alpha = strokeStyle.alpha;

          annotationShapes.set(annotation.id, { annotation, fill, stroke, strokeWidth, drawFn });
        });
      } else {
        const { fillStyle, strokeStyle } = this.getGraphicsStyle(s);

        annotationShapes.forEach(({ annotation, fill, stroke, strokeWidth, drawFn }, _) => {
          fill.tint = fillStyle.tint;
          fill.alpha = fillStyle.alpha;

          stroke.tint = strokeStyle.tint || 0xFFFFFF;
          stroke.alpha = strokeStyle.alpha;

          annotationShapes.set(annotation.id, { annotation, fill, stroke, strokeWidth, drawFn });
        });
      }

      style = s;

      renderer.render(container);
    }

    const setVisible = (visible: boolean) => {
      if (visible)
        canvas.classList.remove('hidden');
      else
        canvas.classList.add('hidden');
    }

    const destroy = () => {
      this.annotationTree.clear();
      renderer.destroy();
    }

    return {
      addAnnotation,
      destroy,
      redraw: this.redrawStage(viewer, container, annotationShapes, renderer),
      removeAnnotation,
      resize,
      setFilter,
      setHovered,
      setSelected,
      setStyle,
      setVisible,
      updateAnnotation
    }

  }
}