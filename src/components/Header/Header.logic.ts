import { useState } from 'react';
import { useDirectory } from '../../shared/DirectoryContext';
import { useNavigation } from '../../shared/NavigationContext';

export function useHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { page, navigate, pageHref, linkTo } = useNavigation();
    const { resetFilters, setSavedOnly, savedCount } = useDirectory();

    function browseSaved() {
        resetFilters();
        setSavedOnly(true);
        setMenuOpen(false);
        navigate(`home`, `directory`);
        document.getElementById(`directory`)?.scrollIntoView({ behavior: `smooth` });
    }

    return { page, pageHref, linkTo, menuOpen, setMenuOpen, browseSaved, savedCount };
}
