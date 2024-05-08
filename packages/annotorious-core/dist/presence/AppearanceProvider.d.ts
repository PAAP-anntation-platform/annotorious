import { PresentUser } from './PresentUser';
import { Appearance } from './Appearance';
import { User } from '../model/User';

export interface AppearanceProvider {
    addUser(presenceKey: string, user: User): Appearance;
    removeUser(user: PresentUser): void;
}
export declare const defaultColorProvider: () => {
    assignRandomColor: () => string;
    releaseColor: (color: string) => number;
};
export declare const createDefaultAppearenceProvider: () => {
    addUser: (presenceKey: string, user: User) => Appearance;
    removeUser: (user: PresentUser) => number;
};
//# sourceMappingURL=AppearanceProvider.d.ts.map