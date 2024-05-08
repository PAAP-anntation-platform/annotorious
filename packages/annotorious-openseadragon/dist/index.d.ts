import { ShapeType as _ShapeType } from '@annotorious/annotorious';
import { PointerSelectAction as _PointerSelectAction } from '@annotorious/core';
export * from './Annotorious';
export type { Annotation, AnnotationBody, AnnotationState, AnnotationTarget, Annotator, AnnotatorState, Color, DrawingStyle, DrawingStyleExpression, FormatAdapter, HoverState, Selection, SelectionState, Store, StoreChangeEvent, StoreObserver, ParseResult, User, W3CAnnotation, W3CAnnotationBody, W3CAnnotationTarget } from '@annotorious/core';
export declare const defaultColorProvider: () => {
    assignRandomColor: () => string;
    releaseColor: (color: string) => number;
};
export declare const PointerSelectAction: typeof _PointerSelectAction;
export declare const createBody: (annotation: import('@annotorious/core').Annotation, payload: {
    [key: string]: any;
}, created?: Date | undefined, creator?: import('@annotorious/core').User | undefined) => import('@annotorious/core').AnnotationBody;
export type { AnnotoriousOpts, DrawingMode, DrawingTool, FragmentSelector, ImageAnnotator as AnnotoriousImageAnnotator, ImageAnnotation, ImageAnnotator, ImageAnnotatorState, Polygon, PolygonGeometry, Rectangle, RectangleGeometry, Shape, SVGSelector, W3CImageAnnotation, W3CImageAnnotationTarget } from '@annotorious/annotorious';
export declare const createImageAnnotator: <E extends unknown = import('@annotorious/annotorious').ImageAnnotation>(image: string | HTMLImageElement | HTMLCanvasElement, options?: import('@annotorious/annotorious').AnnotoriousOpts<import('@annotorious/annotorious').ImageAnnotation, E> | undefined) => import('@annotorious/annotorious').ImageAnnotator<E>;
export declare const ShapeType: typeof _ShapeType;
export declare const W3CImageFormat: (source: string, invertY?: boolean | undefined) => import('@annotorious/annotorious').W3CImageFormatAdapter;
//# sourceMappingURL=index.d.ts.map