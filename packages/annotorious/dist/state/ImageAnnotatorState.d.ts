import { ImageAnnotationStore, SvelteImageAnnotatorState } from './ImageAnnotationStore';
import { AnnotatorState, HoverState, SelectionState } from '@annotorious/core';
import { AnnotoriousOpts } from '../AnnotoriousOpts';
import { ImageAnnotation } from '../model';

export type ImageAnnotatorState<T extends ImageAnnotationStore = ImageAnnotationStore> = AnnotatorState<ImageAnnotation> & {
    store: T;
    selection: SelectionState<ImageAnnotation>;
    hover: HoverState<ImageAnnotation>;
};
export declare const createImageAnnotatorState: <E extends unknown>(opts: AnnotoriousOpts<ImageAnnotation, E>) => ImageAnnotatorState<ImageAnnotationStore>;
export declare const createSvelteImageAnnotatorState: <E extends unknown>(opts: AnnotoriousOpts<ImageAnnotation, E>) => SvelteImageAnnotatorState;
//# sourceMappingURL=ImageAnnotatorState.d.ts.map