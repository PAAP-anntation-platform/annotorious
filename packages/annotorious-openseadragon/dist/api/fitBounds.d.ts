import { default as OpenSeadragon } from 'openseadragon';
import { ImageAnnotationStore } from '@annotorious/annotorious';

export interface FitboundsOptions {
    immediately?: boolean;
    padding?: number | [number, number, number, number];
}
export declare const fitBounds: (viewer: OpenSeadragon.Viewer, store: ImageAnnotationStore) => (arg: {
    id: string;
} | string, opts?: FitboundsOptions) => void;
export declare const fitBoundsWithConstraints: (viewer: OpenSeadragon.Viewer, store: ImageAnnotationStore) => (arg: {
    id: string;
} | string, opts?: FitboundsOptions) => void;
//# sourceMappingURL=fitBounds.d.ts.map