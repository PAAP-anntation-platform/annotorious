import { AppearanceProvider } from './AppearanceProvider';
import { PresenceEvents } from './PresenceEvents';
import { PresentUser } from './PresentUser';
import { User } from '../model/User';
import { Unsubscribe } from 'nanoevents';

export interface PresenceState {
    getPresentUsers(): PresentUser[];
    notifyActivity(presenceKey: string, annotationIds: string[]): void;
    on<E extends keyof PresenceEvents>(event: E, callback: PresenceEvents[E]): Unsubscribe;
    syncUsers(state: {
        presenceKey: string;
        user: User;
    }[]): void;
    updateSelection(presenceKey: string, selection: string[] | null): void;
}
export declare const PRESENCE_KEY: string;
export declare const createPresenceState: (appearanceProvider?: AppearanceProvider) => PresenceState;
//# sourceMappingURL=PresenceState.d.ts.map