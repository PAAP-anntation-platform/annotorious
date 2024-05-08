import { User } from '../model/User';
import { Annotation, AnnotationBody } from '../model/Annotation';

/**
 * Returns all users listed as creators or updaters in any parts of this
 * annotation.
 */
export declare const getContributors: (annotation: Annotation) => User[];
export declare const createBody: (annotation: Annotation, payload: {
    [key: string]: any;
}, created?: Date, creator?: User) => AnnotationBody;
//# sourceMappingURL=annotationUtils.d.ts.map