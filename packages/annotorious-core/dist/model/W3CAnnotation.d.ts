import { AnnotationBody } from './Annotation';

export interface W3CAnnotation {
    '@context': 'http://www.w3.org/ns/anno.jsonld';
    type: 'Annotation';
    id: string;
    created?: string;
    creator?: W3CUser;
    modified?: string;
    body: W3CAnnotationBody | W3CAnnotationBody[];
    target: W3CAnnotationTarget | W3CAnnotationTarget[];
    [key: string]: any;
}
export interface W3CUser {
    type?: string;
    id: string;
    name?: string;
}
export interface W3CAnnotationBody {
    type?: string;
    id?: string;
    purpose?: string;
    value?: string;
    source?: string;
    created?: string;
    creator?: W3CUser;
}
export interface W3CAnnotationTarget {
    id?: string;
    source: string;
    selector?: AbstractW3CSelector;
}
export interface AbstractW3CSelector {
}
export declare const parseW3CUser: (user?: any) => any;
/**
 * Helper to crosswalk the W3C annotation body to a list of core AnnotationBody objects.
 */
export declare const parseW3CBodies: (body: W3CAnnotationBody | W3CAnnotationBody[], annotationId: string) => AnnotationBody[];
/** Serialization helper to remove core-specific fields from the annotation body **/
export declare const serializeW3CBodies: (bodies: AnnotationBody[]) => W3CAnnotationBody[];
//# sourceMappingURL=W3CAnnotation.d.ts.map