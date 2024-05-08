import { ImageAnnotation } from '../model';
import { Store, SvelteAnnotatorState, SvelteStore } from '@annotorious/core';

export type ImageAnnotationStore = Store<ImageAnnotation> & {
    getAt(x: number, y: number): ImageAnnotation | undefined;
    getIntersecting(x: number, y: number, width: number, height: number): ImageAnnotation[];
};
export type SvelteImageAnnotationStore = SvelteStore<ImageAnnotation> & ImageAnnotationStore;
export type SvelteImageAnnotatorState = SvelteAnnotatorState<ImageAnnotation> & {
    store: SvelteImageAnnotationStore;
};
//# sourceMappingURL=ImageAnnotationStore.d.ts.map