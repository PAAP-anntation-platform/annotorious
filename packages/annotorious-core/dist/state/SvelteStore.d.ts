import { Store } from './Store';
import { Annotation, Annotator, AnnotatorState } from '../model';

type Subscriber<T extends Annotation> = (annotation: T[]) => void;
export interface SvelteStore<T extends Annotation> extends Store<T> {
    subscribe(onChange: Subscriber<T>): void;
}
export interface SvelteAnnotatorState<T extends Annotation> extends AnnotatorState<T> {
    store: SvelteStore<T>;
}
export interface SvelteAnnotator<T extends Annotation> extends Annotator<T> {
    state: SvelteAnnotatorState<T>;
}
/**
 * A simple wrapper around the event-based store implementation
 * that adds a Svelte shim, for use with the reactive '$' notation.
 * Other frameworks might not actually need this. But it's pretty
 * convenient for everyone using Svelte, as well as for the
 * basic (Svelte-based) Annotorious standard implementation.
 */
export declare const toSvelteStore: <T extends Annotation>(store: Store<T>) => SvelteStore<T>;
export {};
//# sourceMappingURL=SvelteStore.d.ts.map