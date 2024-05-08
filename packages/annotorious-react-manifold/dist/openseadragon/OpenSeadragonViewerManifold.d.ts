import { Viewer } from '@annotorious/react';
import { ReactNode } from 'react';

interface OSDViewerContextValue {
    viewers: Map<string, Viewer>;
    setViewers: React.Dispatch<React.SetStateAction<Map<string, Viewer>>>;
}
export declare const OSDViewerContext: import('react').Context<OSDViewerContextValue>;
export declare const OSDViewerManifold: (props: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useViewers: () => Map<string, Viewer>;
export {};
//# sourceMappingURL=OpenSeadragonViewerManifold.d.ts.map