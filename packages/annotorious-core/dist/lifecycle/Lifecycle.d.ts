import { LifecycleEvents } from './LifecycleEvents';
import { UndoStack } from '../state';
import { Annotation, AnnotatorState, FormatAdapter } from '../model';

export type Lifecycle<I extends Annotation, E extends unknown> = ReturnType<typeof createLifecyleObserver<I, E>>;
export declare const createLifecyleObserver: <I extends Annotation, E extends unknown>(state: AnnotatorState<I>, undoStack: UndoStack<I>, adapter?: FormatAdapter<I, E>, autoSave?: boolean) => {
    on: <T extends keyof LifecycleEvents<Annotation>>(event: T, callback: LifecycleEvents<E>[T]) => void;
    off: <T_1 extends keyof LifecycleEvents<E>>(event: T_1, callback: LifecycleEvents<E>[T_1]) => void;
    emit: (event: keyof LifecycleEvents<E>, arg0: I | I[], arg1?: I | PointerEvent) => void;
};
//# sourceMappingURL=Lifecycle.d.ts.map