export type Role = `Subscriber` | `Developer` | `Admin` | `Owner`;
export type ConnectionState<T> = { status: `unconfigured`; data: null; message: string } | { status: `ready`; data: T; message: string };
export interface Profile { id: string; number: number; firebaseUid: string; name: string; email: string; bio: string; photoURL: string | null; privacy: `private` | `public`; role: Role; }
export interface Toolkit { id: string; number: number; ownerId: string; name: string; toolIds: string[]; visibility: `private` | `public`; }
export interface AnalyticsReport { source: `vercel`; fetchedAt: string | null; visitors: number | null; pageViews: number | null; }
export const backendNotice = `Firebase is not connected. No account, cloud save or analytics request has been made.`;
const unavailable = <T>(): ConnectionState<T> => ({ data: null, status: `unconfigured`, message: backendNotice });
const rejectMutation = async (): Promise<never> => { throw new Error(backendNotice); };
// Deliberately contains no SDK, network transport or credential reader. A future adapter must enforce authorization server-side.
export const accountService = {
    getSession: async () => unavailable<Profile>(),
    signInWithGoogle: rejectMutation,
    signInWithEmail: rejectMutation,
    createAccount: rejectMutation,
    resetPassword: rejectMutation,
    saveProfile: rejectMutation,
    publishToolkit: rejectMutation,
    getAnalytics: async () => unavailable<AnalyticsReport>(),
    subscribeToolkits: (onState: (state: ConnectionState<Toolkit[]>) => void) => {
        onState(unavailable<Toolkit[]>());
        return () => undefined;
    },
};
