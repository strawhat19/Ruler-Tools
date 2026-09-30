import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type AccountMode = `sign-in` | `sign-up`;

interface AccountState {
    isSignedIn: boolean;
    signOut: () => void;
    closeAccount: () => void;
    previewSignIn: () => void;
    dialogMode: AccountMode | null;
    openAccount: (mode: AccountMode) => void;
}

const AccountContext = createContext<AccountState | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [dialogMode, setDialogMode] = useState<AccountMode | null>(null);

    const signOut = useCallback(() => {
        setIsSignedIn(false);
        setDialogMode(null);
    }, []);

    const previewSignIn = useCallback(() => {
        setIsSignedIn(true);
        setDialogMode(null);
    }, []);

    const closeAccount = useCallback(() => setDialogMode(null), []);
    const openAccount = useCallback((mode: AccountMode) => setDialogMode(mode), []);

    const value = useMemo(() => ({
        signOut,
        dialogMode,
        isSignedIn,
        openAccount,
        closeAccount,
        previewSignIn,
    }), [signOut, dialogMode, isSignedIn, openAccount, closeAccount, previewSignIn]);

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccount() {
    const context = useContext(AccountContext);

    if (!context) throw new Error(`useAccount must be used inside AccountProvider.`);

    return context;
}
