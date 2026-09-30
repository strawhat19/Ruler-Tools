import { useDirectory } from '../../shared/DirectoryContext';

export function useShowcase() {
    const { setCategory, resetFilters } = useDirectory();

    function exploreMeasuring() {
        resetFilters();
        setCategory(`measuring`);
    }

    return { exploreMeasuring };
}
