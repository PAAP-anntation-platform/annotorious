import { Annotation, AnnotationBody, AnnotationTarget } from '../model/Annotation';

/** Interface for listening to changes in the annotation store **/
export interface StoreObserver<T extends Annotation> {
    onChange: {
        (event: StoreChangeEvent<T>): void;
    };
    options: StoreObserveOptions;
}
/** A change event fired when the store state changes **/
export interface StoreChangeEvent<T extends Annotation> {
    origin: Origin;
    changes: ChangeSet<T>;
    state: T[];
}
export interface ChangeSet<T extends Annotation> {
    created?: T[];
    deleted?: T[];
    updated?: Update<T>[];
}
export interface Update<T extends Annotation> {
    oldValue: T;
    newValue: T;
    bodiesCreated?: AnnotationBody[];
    bodiesDeleted?: AnnotationBody[];
    bodiesUpdated?: Array<{
        oldBody: AnnotationBody;
        newBody: AnnotationBody;
    }>;
    targetUpdated?: {
        oldTarget: AnnotationTarget;
        newTarget: AnnotationTarget;
    };
}
/** Options to control which events the observer wants to get notified about **/
export interface StoreObserveOptions {
    ignore?: Ignore;
    annotations?: string | string[];
    origin?: Origin;
}
/** Allows the observer to ignore certain event types **/
export declare enum Ignore {
    BODY_ONLY = "BODY_ONLY",
    TARGET_ONLY = "TARGET_ONLY"
}
/** Allows the observer to listen only for events that originated locally or from a remote source **/
export declare enum Origin {
    LOCAL = "LOCAL",
    REMOTE = "REMOTE"
}
/** Tests if this observer should be notified about this event **/
export declare const shouldNotify: <T extends Annotation>(observer: StoreObserver<T>, event: StoreChangeEvent<T>) => boolean;
export declare const mergeChanges: <T extends Annotation>(changes: ChangeSet<T>, toMerge: ChangeSet<T>) => {
    created: T[];
    deleted: T[];
    updated: Update<T>[];
};
//# sourceMappingURL=StoreObserver.d.ts.map