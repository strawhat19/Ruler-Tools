import { useEffect, useState } from 'react';
import type { Platform } from '../../shared/types';
import { useDirectory } from '../../shared/DirectoryContext';

export const platformFilters: { id: Platform; name: string; icon: `compass` | `globe` | `puzzle` | `phone` }[] = [
    { id: `all`, name: `All tools`, icon: `compass` },
    { id: `website`, name: `Websites`, icon: `globe` },
    { id: `extension`, name: `Extensions`, icon: `puzzle` },
    { id: `app`, name: `Apps`, icon: `phone` },
];

export function useDirectoryView() {
    const directory = useDirectory();
    const [visibleCount, setVisibleCount] = useState(9);
    const { query, category, platform, savedOnly, sort } = directory;

    useEffect(() => {
        setVisibleCount(9);
    }, [query, category, platform, savedOnly, sort]);

    return { ...directory, visibleCount, showAll: () => setVisibleCount(directory.filteredTools.length) };
}
