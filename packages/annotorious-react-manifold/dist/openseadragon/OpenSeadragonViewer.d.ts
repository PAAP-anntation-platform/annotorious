import { OpenSeadragonViewerProps as OpenSeadragonViewerInstanceProps } from '@annotorious/react';

type OpenSeadragonViewerProps = OpenSeadragonViewerInstanceProps & {
    id: string;
};
/**
 * An alternative <OpenSeadragonViewer /> component that mimicks the original
 * from @annotorious/react, but injects a shim component that connects
 * the Viewer to the ViewerManifold.
 */
export declare const OpenSeadragonViewer: (props: OpenSeadragonViewerProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=OpenSeadragonViewer.d.ts.map