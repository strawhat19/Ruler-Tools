import type { MouseEvent } from 'react';
import { useDirectory } from '../../shared/DirectoryContext';
import { useNavigation } from '../../shared/NavigationContext';

export function useFooter() {
    const year = new Date().getFullYear();
    const { navigate, pageHref, linkTo } = useNavigation();
    const { resetFilters } = useDirectory();

    const browseTools = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        resetFilters();
        navigate(`home`, `directory`);
    };

    return { year, pageHref, linkTo, browseTools };
}
