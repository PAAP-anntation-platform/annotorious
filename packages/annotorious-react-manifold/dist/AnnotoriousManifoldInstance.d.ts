import { Origin, Annotation, AnnotationBody, Annotator } from '@annotorious/react';

export interface AnnotoriousManifoldInstance<I extends Annotation = Annotation, E extends {
    id: string;
} = Annotation> {
    annotators: Annotator<I, E>[];
    sources: string[];
    addBody(body: AnnotationBody, origin?: Origin): void;
    clear(origin: Origin): void;
    deleteAnnotation(id: string, origin?: Origin): I | undefined;
    deleteBody(body: AnnotationBody, origin?: Origin): void;
    destroy(): void;
    findAnnotator(annotationId: string): Annotator<I, E> | undefined;
    findSource(annotationId: string): string | undefined;
    getAnnotation(id: string): I | undefined;
    getAnnotations(): I[];
    getAnnotator(id: string): Annotator<I, E> | undefined;
    setSelected(annotationId: string): void;
    updateAnnotation(arg1: string | I, arg2?: I | Origin, arg3?: Origin): void;
}
export declare const createManifoldInstance: <I extends Annotation = Annotation, E extends {
    id: string;
} = Annotation>(annotators: Map<string, Annotator<I, E>>) => AnnotoriousManifoldInstance<I, E>;
//# sourceMappingURL=AnnotoriousManifoldInstance.d.ts.map