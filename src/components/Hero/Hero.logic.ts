import { useEffect, useRef } from 'react';
import { useDirectory } from '../../shared/DirectoryContext';

export function useHero() {
    const searchRef = useRef<HTMLInputElement>(null);
    const { query, setQuery, resetFilters } = useDirectory();

    useEffect(() => {
        function focusSearch(event: KeyboardEvent) {
            const target = event.target as HTMLElement;
            const isInput = /INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable;

            if (event.key === `/` && !isInput && !event.ctrlKey && !event.metaKey && !event.altKey) {
                event.preventDefault();
                searchRef.current?.focus();
            }
        }

        window.addEventListener(`keydown`, focusSearch);
        return () => window.removeEventListener(`keydown`, focusSearch);
    }, []);

    function searchTools(value?: string) {
        if (value !== undefined) {
            resetFilters();
            setQuery(value);
        }

        document.getElementById(`directory`)?.scrollIntoView({ behavior: `smooth` });
    }

    return { query, setQuery, searchRef, searchTools };
}
