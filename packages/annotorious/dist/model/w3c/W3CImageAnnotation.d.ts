import { SVGSelector } from './svg';
import { FragmentSelector } from './fragment';
import { W3CAnnotation, W3CAnnotationTarget } from '@annotorious/core';

export interface W3CImageAnnotation extends W3CAnnotation {
    target: W3CImageAnnotationTarget | W3CImageAnnotationTarget[];
}
export interface W3CImageAnnotationTarget extends W3CAnnotationTarget {
    selector: W3CImageSelector | W3CImageSelector[];
}
export type W3CImageSelector = FragmentSelector | SVGSelector;
//# sourceMappingURL=W3CImageAnnotation.d.ts.map