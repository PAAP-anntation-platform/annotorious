import { DrawingMode } from '../../AnnotoriousOpts';
import { SvelteComponent } from 'svelte';

export type DrawingTool = 'rectangle' | 'polygon' | string;
export type DrawingToolOpts = {
    drawingMode?: DrawingMode;
    [key: string]: any;
};
export declare const listDrawingTools: () => string[];
export declare const getTool: (name: string) => {
    tool: typeof SvelteComponent;
    opts?: DrawingToolOpts | undefined;
} | undefined;
export declare const registerTool: (name: string, tool: typeof SvelteComponent, opts?: DrawingToolOpts) => Map<string, {
    tool: typeof SvelteComponent;
    opts?: DrawingToolOpts | undefined;
}>;
//# sourceMappingURL=drawingToolsRegistry.d.ts.map