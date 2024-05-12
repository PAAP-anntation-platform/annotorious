/// <reference types="svelte" />
export type ViewportState = ReturnType<typeof createViewportState>;
export declare const createViewportState: () => {
    subscribe: (this: void, run: import('svelte/store').Subscriber<string[]>, invalidate?: import('svelte/store').Invalidator<string[]> | undefined) => import('svelte/store').Unsubscriber;
    set: (this: void, value: string[]) => void;
};
//# sourceMappingURL=Viewport.d.ts.map