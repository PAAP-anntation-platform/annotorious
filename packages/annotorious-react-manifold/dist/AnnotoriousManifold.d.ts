import { AnnotoriousManifoldInstance } from './AnnotoriousManifoldInstance';
import { Annotation, Annotator } from '@annotorious/react';
import { ReactNode } from 'react';

interface AnnotoriousManifoldContextValue {
    annotators: Map<string, Annotator<any, {
        id: string;
    }>>;
    annotations: Map<string, Annotation[]>;
    selection: ManifoldSelection;
    connectAnnotator(source: string, anno: Annotator<any, {
        id: string;
    }>): () => void;
}
interface ManifoldSelection<T extends Annotation = Annotation> {
    id?: string;
    selected: {
        annotation: T;
        editable?: boolean;
    }[];
    pointerEvent?: PointerEvent;
}
export declare const AnnotoriousManifoldContext: import('react').Context<AnnotoriousManifoldContextValue>;
export declare const AnnotoriousManifold: (props: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useAnnotoriousManifold: <I extends Annotation = Annotation, E extends {
    id: string;
} = Annotation>() => AnnotoriousManifoldInstance<I, E>;
export declare const useAnnotator: <I extends Annotation = Annotation, E extends {
    id: string;
} = Annotation>(id: string) => Annotator<I, E>;
export declare const useAnnotations: <T extends Annotation>() => Map<string, T[]>;
export declare const useSelection: <T extends Annotation>() => ManifoldSelection<T>;
export {};
//# sourceMappingURL=AnnotoriousManifold.d.ts.map