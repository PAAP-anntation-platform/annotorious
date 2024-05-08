import { User } from './User';

export interface Annotation {
    id: string;
    target: AnnotationTarget;
    bodies: AnnotationBody[];
    properties?: {
        [key: string]: any;
    };
}
export interface AnnotationTarget {
    annotation: string;
    selector: AbstractSelector;
    creator?: User;
    created?: Date;
    updatedBy?: User;
    updated?: Date;
}
export interface AbstractSelector {
}
export interface AnnotationBody {
    id: string;
    annotation: string;
    type?: string;
    purpose?: Purpose | string;
    value?: string;
    creator?: User;
    created?: Date;
    updatedBy?: User;
    updated?: Date;
}
export type Purpose = 'assessing' | 'bookmarking' | 'classifying' | 'commenting' | 'describing' | 'editing' | 'highlighting' | 'identifying' | 'linking' | 'moderating' | 'questioning' | 'replying' | 'tagging';
//# sourceMappingURL=Annotation.d.ts.map