import { W3CImageAnnotation } from './W3CImageAnnotation';
import { ImageAnnotation } from '../core';
import { FormatAdapter, ParseResult, W3CAnnotation } from '@annotorious/core';

export type W3CImageFormatAdapter = FormatAdapter<ImageAnnotation, W3CImageAnnotation>;
export declare const W3CImageFormat: (source: string, invertY?: boolean) => W3CImageFormatAdapter;
export declare const parseW3CImageAnnotation: (annotation: W3CAnnotation, invertY?: boolean) => ParseResult<ImageAnnotation>;
export declare const serializeW3CImageAnnotation: (annotation: ImageAnnotation, source: string) => W3CImageAnnotation;
//# sourceMappingURL=W3CImageFormatAdapter.d.ts.map