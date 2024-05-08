import { ImageAnnotation } from './model';
import { Annotation, DrawingStyle, FormatAdapter, PointerSelectAction } from '@annotorious/core';

export interface AnnotoriousOpts<I extends Annotation = ImageAnnotation, E extends unknown = ImageAnnotation> {
    adapter?: FormatAdapter<I, E>;
    autoSave?: boolean;
    drawingEnabled?: boolean;
    drawingMode?: DrawingMode;
    pointerSelectAction?: PointerSelectAction | ((a: I) => PointerSelectAction);
    style?: DrawingStyle | ((annotation: I) => DrawingStyle);
    theme?: Theme;
}
export type DrawingMode = 'click' | 'drag';
export type Theme = 'dark' | 'light' | 'auto';
export declare const fillDefaults: <I extends ImageAnnotation = ImageAnnotation, E extends unknown = ImageAnnotation>(opts: AnnotoriousOpts<I, E>, defaults: AnnotoriousOpts<I, E>) => AnnotoriousOpts<I, E>;
//# sourceMappingURL=AnnotoriousOpts.d.ts.map