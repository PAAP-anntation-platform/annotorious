import { AnnotoriousPopupProps } from '../AnnotoriousPopup';
import { default as OpenSeadragon } from 'openseadragon';
import { ReactNode } from 'react';

export type OpenSeadragonPopupProps = AnnotoriousPopupProps & {
    viewer: OpenSeadragon.Viewer;
};
export type OpenSeadragonPopupContainerProps = {
    popup(props: OpenSeadragonPopupProps): ReactNode;
};
export declare const OpenSeadragonPopup: (props: OpenSeadragonPopupContainerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OpenSeadragonPopup.d.ts.map