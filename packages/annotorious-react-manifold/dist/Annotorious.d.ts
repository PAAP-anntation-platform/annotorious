import { ReactNode } from 'react';

interface AnnotoriousProps {
    children: ReactNode;
    id: string;
}
/**
 * An alternative <Annotorious /> component that mimicks the original
 * from @annotorious/react, but injects the shim component, which connects
 * the Annotator to the Manifold.
 */
export declare const Annotorious: (props: AnnotoriousProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Annotorious.d.ts.map