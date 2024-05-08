import { Annotation } from '../model/Annotation';
import { Update } from '../state/StoreObserver';

export declare const diffAnnotations: <T extends Annotation = Annotation>(oldValue: T, newValue: T) => Update<T>;
//# sourceMappingURL=diffAnnotations.d.ts.map