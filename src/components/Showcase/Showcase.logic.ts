import type { MouseEvent } from 'react';
import { useDirectory } from '../../shared/DirectoryContext';
import { useNavigation } from '../../shared/NavigationContext';

export function useShowcase() {
    const { pageHref, navigate } = useNavigation();
    const { setCategory, resetFilters } = useDirectory();

    function exploreMeasuring(event: MouseEvent<HTMLAnchorElement>) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        resetFilters();
        setCategory(`measuring`);
        navigate(`home`, `directory`);
    }

    return { pageHref, exploreMeasuring };
}
