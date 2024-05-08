import { Theme, AnnotoriousOpts } from './AnnotoriousOpts';
import { ImageAnnotation, ShapeType } from './model';
import { DrawingToolOpts } from './annotation';
import { DrawingTool } from './annotation/tools';
import { Annotator } from '@annotorious/core';
import { SvelteComponent } from 'svelte';

export interface ImageAnnotator<E extends unknown = ImageAnnotation> extends Annotator<ImageAnnotation, E> {
    listDrawingTools(): string[];
    registerDrawingTool(name: string, tool: typeof SvelteComponent, opts?: DrawingToolOpts): void;
    registerShapeEditor(shapeType: ShapeType, editor: typeof SvelteComponent): void;
    setDrawingTool(name: DrawingTool): void;
    setDrawingEnabled(enabled: boolean): void;
    setTheme(theme: Theme): void;
}
export declare const createImageAnnotator: <E extends unknown = ImageAnnotation>(image: string | HTMLImageElement | HTMLCanvasElement, options?: AnnotoriousOpts<ImageAnnotation, E>) => ImageAnnotator<E>;
//# sourceMappingURL=Annotorious.d.ts.map