import { Annotator } from '@annotorious/annotorious';

export type AnnotatorPlugin<T extends unknown = Annotator<any, unknown>> = (anno: T, opts?: Object) => ({
    unmount?: () => void;
}) | void;
export interface AnnotoriousPluginProps<T extends unknown = Annotator<any, unknown>> {
    plugin: AnnotatorPlugin<T>;
    opts?: Object;
}
export declare const AnnotoriousPlugin: <T extends unknown = Annotator<any, unknown>>(props: AnnotoriousPluginProps<T>) => any;
//# sourceMappingURL=AnnotoriousPlugin.d.ts.map