import { Store } from './Store';
import { Annotation } from '../model';

export type Selection = {
    selected: {
        id: string;
        editable?: boolean;
    }[];
    pointerEvent?: PointerEvent;
};
export type SelectionState<T extends Annotation> = ReturnType<typeof createSelectionState<T>>;
export declare enum PointerSelectAction {
    EDIT = "EDIT",// Make annotation target(s) editable on pointer select
    SELECT = "SELECT",// Just select, but don't make editable
    NONE = "NONE"
}
export declare const createSelectionState: <T extends Annotation>(store: Store<T>, selectAction?: PointerSelectAction | ((a: T) => PointerSelectAction)) => {
    clear: () => void;
    clickSelect: (id: string, pointerEvent: PointerEvent) => void;
    readonly selected: {
        id: string;
        editable?: boolean | undefined;
    }[] | null;
    readonly pointerEvent: PointerEvent | null | undefined;
    isEmpty: () => boolean;
    isSelected: (annotationOrId: T | string) => boolean;
    setSelected: (idOrIds: string | string[], editable?: boolean) => void;
    subscribe: (this: void, run: import('svelte/store').Subscriber<Selection>, invalidate?: import('svelte/store').Invalidator<Selection> | undefined) => import('svelte/store').Unsubscriber;
};
export declare const onPointerSelect: <T extends Annotation>(annotation: T, action?: PointerSelectAction | ((a: T) => PointerSelectAction)) => PointerSelectAction;
//# sourceMappingURL=Selection.d.ts.map