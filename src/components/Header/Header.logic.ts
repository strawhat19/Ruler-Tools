import { useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import { useAccount } from '../../shared/AccountContext';
import { useDirectory } from '../../shared/DirectoryContext';
import { useNavigation } from '../../shared/NavigationContext';

export function useHeader() {
    const { isDark, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const { isSignedIn, openAccount, signOut } = useAccount();
    const { page, navigate, pageHref, linkTo } = useNavigation();
    const { resetFilters, setSavedOnly, savedCount } = useDirectory();

    function browseSaved() {
        resetFilters();
        setSavedOnly(true);
        setMenuOpen(false);
        navigate(`home`, `directory`);
        document.getElementById(`directory`)?.scrollIntoView({ behavior: `smooth` });
    }

    return {
        page,
        isDark,
        linkTo,
        signOut,
        pageHref,
        menuOpen,
        toggleTheme,
        savedCount,
        isSignedIn,
        openAccount,
        browseSaved,
        setMenuOpen,
    };
}
