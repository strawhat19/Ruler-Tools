import { useState } from 'react';
import { useDirectory } from '../../shared/DirectoryContext';

export function useHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { resetFilters, setSavedOnly, savedCount } = useDirectory();

    function browseTools() {
        resetFilters();
        setMenuOpen(false);
    }

    function browseSaved() {
        resetFilters();
        setSavedOnly(true);
        setMenuOpen(false);
        document.getElementById(`directory`)?.scrollIntoView({ behavior: `smooth` });
    }

    return { menuOpen, setMenuOpen, browseTools, browseSaved, savedCount };
}
