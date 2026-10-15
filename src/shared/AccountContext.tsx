import type { ReactNode } from 'react';
import { useNavigation } from './NavigationContext';
import { createContext, useContext, useMemo } from 'react';

export type AccountMode = `sign-in` | `sign-up`;
interface AccountState {
    isSignedIn: false;
    signOut: () => void;
    closeAccount: () => void;
    previewSignIn: () => void;
    dialogMode: AccountMode | null;
    openAccount: (mode: AccountMode) => void;
}
const AccountContext = createContext<AccountState | undefined>(undefined);
export function AccountProvider({ children }: { children: ReactNode }) {
    const { navigate } = useNavigation();
    const value = useMemo<AccountState>(() => ({
        isSignedIn: false,
        dialogMode: null,
        signOut: () => navigate(`home`),
        closeAccount: () => navigate(`home`),
        previewSignIn: () => navigate(`toolkits`),
        openAccount: mode => navigate(mode === `sign-up` ? `signup` : `signin`),
    }), [navigate]);
    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
export function useAccount() {
    const context = useContext(AccountContext);
    if (!context) throw new Error(`useAccount must be used inside AccountProvider.`);
    return context;
}
