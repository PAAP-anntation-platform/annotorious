import { AnnotoriousOpts, DrawingStyle, DrawingTool, Filter, ImageAnnotation } from '@annotorious/annotorious';
import { ReactElement } from 'react';

export interface ImageAnnotatorProps<E extends unknown> extends AnnotoriousOpts<ImageAnnotation, E> {
    children: ReactElement<HTMLImageElement>;
    filter?: Filter<ImageAnnotation>;
    style?: DrawingStyle | ((annotation: ImageAnnotation) => DrawingStyle);
    tool?: DrawingTool;
}
export declare const ImageAnnotator: <E extends unknown>(props: ImageAnnotatorProps<E>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ImageAnnotator.d.ts.map