import * as PIXI from 'pixi.js';
import type OpenSeadragon from 'openseadragon';
import { ShapeType } from '@annotorious/annotorious';
import type { AnnotationState, DrawingStyle, DrawingStyleExpression, Filter, Selection } from '@annotorious/core';
import type { Ellipse, ImageAnnotation, Polygon, Rectangle, Shape } from '@annotorious/annotorious';

const DEFAULT_FILL = 0x1a73e8;
const DEFAULT_ALPHA = 0.25;

const UPDATE_STROKE_THRESHOLD = 0.02;

// Fast redraws skip counter-scaling operations
// let fastRedraw = false;

// Likewise, if scale has not changed, counter-scaling is also skipped
let lastScale: number;

interface AnnotationShape {

  annotation: ImageAnnotation;

  fill: PIXI.Graphics;

  stroke: PIXI.Graphics;

  strokeWidth: number;

  drawFn: (g: PIXI.Graphics) => void;
}

const getGraphicsStyle = (style?: DrawingStyle) => {
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

const drawShape = <T extends Shape>(fn: (s: T, g: PIXI.Graphics) => void) => (container: PIXI.Container, shape: T, style?: DrawingStyle) => {
  const { fillStyle, strokeStyle } = getGraphicsStyle(style);

  const fillGraphics = new PIXI.Graphics();
  fn(shape, fillGraphics);
  fillGraphics.fill(0xffffff)
  fillGraphics.tint = fillStyle.tint;
  fillGraphics.alpha = fillStyle.alpha;

  container.addChild(fillGraphics);

  // const lineWidth = strokeStyle.lineWidth === 1 ? 1 : strokeStyle.lineWidth / lastScale;
  const lineWidth = strokeStyle.lineWidth / lastScale;

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

const drawEllipse = drawShape((ellipse: Ellipse, g: PIXI.Graphics) => {
  const { cx, cy, rx, ry } = ellipse.geometry;
  g.ellipse(cx, cy, rx, ry)
});

const drawPolygon = drawShape((polygon: Polygon, g: PIXI.Graphics) => {
  const flattend = polygon.geometry.points.reduce((flat, xy) => ([...flat, ...xy]), []);
  g.poly(flattend);
});

const drawRectangle = drawShape((rectangle: Rectangle, g: PIXI.Graphics) => {
  const { x, y, w, h } = rectangle.geometry;
  g.rect(x, y, w, h);
});

const getCurrentScale = (viewer: OpenSeadragon.Viewer) => {
  const containerWidth = viewer.viewport.getContainerSize().x;
  const zoom = viewer.viewport.getZoom(true);
  return zoom * containerWidth / viewer.world.getContentFactor();
}

const redrawStage = (
  viewer: OpenSeadragon.Viewer,
  container: PIXI.Container,
  shapes: Map<String, AnnotationShape>,
  renderer: PIXI.Renderer<PIXI.ICanvas>
) => () => {
  const viewportBounds = viewer.viewport.viewportToImageRectangle(viewer.viewport.getBounds(true));
  const scale = getCurrentScale(viewer);

  if (scale !== lastScale) {
    // fastRedraw = true;

    if (Math.abs(scale - lastScale) > UPDATE_STROKE_THRESHOLD) {
      shapes.forEach(({ stroke, strokeWidth, drawFn }) => {

        // if (strokeWidth > 1) {
        //   // Disable fast redraws if at least one shape
        //   // has non-native stroke
        //   // fastRedraw = false;

        //   stroke.clear()
        //   drawFn(stroke);
        //   stroke.stroke({
        //     color: 0xffffff,
        //     width: strokeWidth / scale,
        //     alpha: 1,
        //     alignment: 0.5,
        //   })

        //   // Counter scale stroke
        // } else if (strokeWidth === 1) {
        //   // Set native stroke if necessary
        //   // strokeStyle.width = 1;
        // }

        stroke.clear()
        drawFn(stroke);
        stroke.stroke({
          color: 0xffffff,
          width: strokeWidth / scale,
          alpha: 1,
          alignment: 0.5,
        })
      });

      lastScale = scale;
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

export const createStage = async (viewer: OpenSeadragon.Viewer, canvas: HTMLCanvasElement) => {

  const container = new PIXI.Container();


  const renderer = await PIXI.autoDetectRenderer({
    width: canvas.width,
    height: canvas.height,
    backgroundAlpha: 0,
    canvas: canvas,
    antialias: true,
    resolution: 2
  });

  // Lookup table: shapes and annotations by annotation ID
  const annotationShapes = new Map<string, AnnotationShape>();

  // Current selection (if any)
  let selectedIds = new Set<string>();

  // Current hover (if any)
  let hovered: string | undefined;

  // Current style (if any)
  let style: DrawingStyleExpression<ImageAnnotation> | undefined = undefined;

  lastScale = getCurrentScale(viewer);

  const addAnnotation = (annotation: ImageAnnotation, state?: AnnotationState) => {
    // In case this annotation adds stroke > 1
    // fastRedraw = false; 

    const { selector } = annotation.target;

    const s = typeof style == 'function' ? style(annotation, state) : style;

    let rendered: { fill: PIXI.Graphics, stroke: PIXI.Graphics, strokeWidth: number, drawFn: (g: PIXI.Graphics) => void } | undefined;

    if (selector.type === ShapeType.RECTANGLE) {
      rendered = drawRectangle(container, selector as Rectangle, s);
    } else if (selector.type === ShapeType.POLYGON) {
      rendered = drawPolygon(container, selector as Polygon, s);
    } else if (selector.type === ShapeType.ELLIPSE) {
      rendered = drawEllipse(container, selector as Ellipse, s);
    } else {
      console.warn(`Unsupported shape type: ${selector.type}`)
    }

    if (rendered)
      annotationShapes.set(annotation.id, { annotation, ...rendered });
  }

  const removeAnnotation = (annotation: ImageAnnotation) => {
    const rendered = annotationShapes.get(annotation.id);
    if (rendered) {
      annotationShapes.delete(annotation.id);
      rendered.fill.destroy();
      rendered.stroke.destroy();
    }
  }

  const updateAnnotation = (oldValue: ImageAnnotation, newValue: ImageAnnotation, state?: AnnotationState) => {
    // In case this annotation adds stroke > 1
    // fastRedraw = false; 

    const rendered = annotationShapes.get(oldValue.id);

    if (rendered) {
      annotationShapes.delete(oldValue.id);
      rendered.fill.destroy();
      rendered.stroke.destroy();

      addAnnotation(newValue, state);
    }
  }

  const redrawAnnotation = (id: string, state?: AnnotationState) => {
    const rendered = annotationShapes.get(id);
    if (rendered) {
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
    // In case this filter adds annotations with stroke > 1
    // fastRedraw = false; 

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
        // if (strokeWidth > 1)
        //   fastRedraw = false;

        const { fillStyle, strokeStyle } = getGraphicsStyle(s(annotation));

        fill.tint = fillStyle.tint;
        fill.alpha = fillStyle.alpha;

        stroke.tint = strokeStyle.tint || 0xFFFFFF;
        stroke.alpha = strokeStyle.alpha;

        annotationShapes.set(annotation.id, { annotation, fill, stroke, strokeWidth, drawFn });
      });
    } else {
      const { fillStyle, strokeStyle } = getGraphicsStyle(s);

      // if (strokeStyle.lineWidth > 1)
      //   fastRedraw = false;

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

  const destroy = () => renderer.destroy();

  return {
    addAnnotation,
    destroy,
    redraw: redrawStage(viewer, container, annotationShapes, renderer),
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