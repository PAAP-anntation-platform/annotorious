import { Shape } from './Shape';
import { Annotation, AnnotationTarget } from '@annotorious/core';

export interface ImageAnnotation extends Annotation {
    target: ImageAnnotationTarget;
}
export interface ImageAnnotationTarget extends AnnotationTarget {
    selector: Shape;
}
//# sourceMappingURL=ImageAnnotation.d.ts.map