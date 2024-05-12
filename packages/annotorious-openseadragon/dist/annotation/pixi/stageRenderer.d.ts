import { ImageAnnotation } from '@annotorious/annotorious';
import { AnnotationState, DrawingStyleExpression, Filter, Selection } from '@annotorious/core';
import { default as OpenSeadragon } from 'openseadragon';

export declare class StageRenderer {
    private lastScale;
    private lastCenter;
    private annotationTree;
    private isAnnotationUpdated;
    private updateAnnotationShape;
    private removeAnnotationFromTree;
    private getGraphicsStyle;
    private drawShape;
    private drawEllipse;
    private drawPolygon;
    private drawRectangle;
    private getCurrentScale;
    private redrawStage;
    createStage: (viewer: OpenSeadragon.Viewer, canvas: HTMLCanvasElement) => Promise<{
        addAnnotation: (annotation: ImageAnnotation, state?: AnnotationState) => void;
        destroy: () => void;
        redraw: () => void;
        removeAnnotation: (annotation: ImageAnnotation) => void;
        resize: (width: number, height: number) => void;
        setFilter: (filter?: Filter<ImageAnnotation>) => void;
        setHovered: (annotationId?: string) => void;
        setSelected: (selection: Selection) => void;
        setStyle: (s?: DrawingStyleExpression<ImageAnnotation>) => void;
        setVisible: (visible: boolean) => void;
        updateAnnotation: (oldValue: ImageAnnotation, newValue: ImageAnnotation, state?: AnnotationState) => void;
    }>;
}
//# sourceMappingURL=stageRenderer.d.ts.map