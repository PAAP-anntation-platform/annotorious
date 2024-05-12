import { AnnotationState } from './AnnotationState';
import { Annotation } from './Annotation';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;
export interface DrawingStyle {
    fill?: Color;
    fillOpacity?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
}
export type DrawingStyleExpression<T extends Annotation = Annotation> = DrawingStyle | ((annotation: T, state?: AnnotationState) => DrawingStyle);
export {};
//# sourceMappingURL=DrawingStyle.d.ts.map