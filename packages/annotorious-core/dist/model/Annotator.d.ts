import { Filter } from './Filter';
import { DrawingStyleExpression } from './DrawingStyle';
import { FormatAdapter } from './FormatAdapter';
import { LifecycleEvents } from '../lifecycle/LifecycleEvents';
import { HoverState, SelectionState, Store, UndoStack, ViewportState } from '../state';
import { PresenceProvider } from '../presence/PresenceProvider';
import { User } from './User';
import { Annotation } from './Annotation';

/**
 * Base annotator interface
 * @template I - internal core data model
 * @template E - external adapted representation
 */
export interface Annotator<I extends Annotation = Annotation, E extends unknown = Annotation> {
    addAnnotation(annotation: E): void;
    cancelSelected(): void;
    canRedo(): boolean;
    canUndo(): boolean;
    clearAnnotations(): void;
    destroy(): void;
    getAnnotationById(id: string): E | undefined;
    getAnnotations(): E[];
    getSelected(): E[];
    getUser(): User;
    loadAnnotations(url: string, replace?: boolean): Promise<E[]>;
    redo(): void;
    removeAnnotation(arg: E | string): E | undefined;
    setAnnotations(annotations: E[], replace?: boolean): void;
    setFilter(filter: Filter | undefined): void;
    setPresenceProvider?(provider: PresenceProvider): void;
    setSelected(arg?: string | string[]): void;
    setStyle(style: DrawingStyleExpression<I> | undefined): void;
    setUser(user: User): void;
    setVisible(visible: boolean): void;
    undo(): void;
    updateAnnotation(annotation: E): E;
    on<T extends keyof LifecycleEvents<E>>(event: T, callback: LifecycleEvents<E>[T]): void;
    off<T extends keyof LifecycleEvents<E>>(event: T, callback: LifecycleEvents<E>[T]): void;
    state: AnnotatorState<I>;
}
export interface AnnotatorState<A extends Annotation> {
    store: Store<A>;
    selection: SelectionState<A>;
    hover: HoverState<A>;
    viewport: ViewportState;
}
export declare const createBaseAnnotator: <I extends Annotation, E extends unknown>(state: AnnotatorState<I>, undoStack: UndoStack<I>, adapter?: FormatAdapter<I, E>) => {
    addAnnotation: (annotation: E) => void;
    cancelSelected: () => void;
    canRedo: () => boolean;
    canUndo: () => boolean;
    clearAnnotations: () => void;
    getAnnotationById: (id: string) => E | undefined;
    getAnnotations: () => E[];
    getSelected: () => E[];
    loadAnnotations: (url: string, replace?: boolean) => Promise<any>;
    redo: () => void;
    removeAnnotation: (arg: E | string) => E | undefined;
    setAnnotations: (annotations: E[], replace?: boolean) => void;
    setSelected: (arg?: string | string[]) => void;
    undo: () => void;
    updateAnnotation: (updated: E) => E;
};
//# sourceMappingURL=Annotator.d.ts.map