import { useDirectory } from '../../shared/DirectoryContext';

export function useFooter() {
    const { resetFilters } = useDirectory();

    return { browseTools: resetFilters };
}
