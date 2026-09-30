import type { ReactNode } from 'react';
import { categories, tools } from './catalog';
import type { Category, Platform, Tool } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type Sort = `featured` | `name`;

interface DirectoryState {
    query: string;
    category: Category;
    platform: Platform;
    savedIds: string[];
    savedOnly: boolean;
    sort: Sort;
    savedCount: number;
    filteredTools: Tool[];
    resetFilters: () => void;
    setQuery: (query: string) => void;
    setSort: (sort: Sort) => void;
    toggleSaved: (id: string) => void;
    setCategory: (category: Category) => void;
    setPlatform: (platform: Platform) => void;
    setSavedOnly: (savedOnly: boolean) => void;
}

const storageKey = `ruler-tools:saved`;
const validIds = new Set(tools.map((tool) => tool.id));
const DirectoryContext = createContext<DirectoryState | undefined>(undefined);
const normalize = (value: string) => value.normalize(`NFKC`).trim().toLowerCase();

export function DirectoryProvider({ children }: { children: ReactNode }) {
    const hydrated = useRef(false);
    const pendingToggles = useRef(new Set<string>());
    const [query, setQuery] = useState(``);
    const [sort, setSort] = useState<Sort>(`featured`);
    const [savedOnly, setSavedOnly] = useState(false);
    const [storageReady, setStorageReady] = useState(false);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [category, setCategory] = useState<Category>(`all`);
    const [platform, setPlatform] = useState<Platform>(`all`);

    useEffect(() => {
        let active = true;

        async function loadSavedTools() {
            let restored: string[] = [];

            try {
                const stored = await AsyncStorage.getItem(storageKey);
                const parsed: unknown = stored ? JSON.parse(stored) : [];

                if (Array.isArray(parsed)) {
                    restored = [...new Set(parsed.filter(
                        (id): id is string => typeof id === `string` && validIds.has(id),
                    ))];
                }
            } catch {
                // Storage can be unavailable; saved tools still work in memory.
            }

            if (!active) return;

            const nextIds = new Set(restored);
            pendingToggles.current.forEach((id) => {
                if (nextIds.has(id)) nextIds.delete(id);
                else nextIds.add(id);
            });

            pendingToggles.current.clear();
            hydrated.current = true;
            setSavedIds([...nextIds]);
            setStorageReady(true);
        }

        void loadSavedTools();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!storageReady) return;
        void AsyncStorage.setItem(storageKey, JSON.stringify(savedIds)).catch(() => {
            // Keep the current in-memory selection when persistence fails.
        });
    }, [savedIds, storageReady]);

    const toggleSaved = useCallback((id: string) => {
        if (!validIds.has(id)) return;

        if (!hydrated.current) {
            if (pendingToggles.current.has(id)) pendingToggles.current.delete(id);
            else pendingToggles.current.add(id);
        }

        setSavedIds((current) => current.includes(id)
            ? current.filter((savedId) => savedId !== id)
            : [...current, id]);
    }, []);

    const resetFilters = useCallback(() => {
        setQuery(``);
        setCategory(`all`);
        setPlatform(`all`);
        setSavedOnly(false);
        setSort(`featured`);
    }, []);

    const filteredTools = useMemo(() => {
        const search = normalize(query);
        const results = tools.filter((tool) => {
            if (savedOnly && !savedIds.includes(tool.id)) return false;
            if (category !== `all` && category !== tool.category) return false;
            if (platform !== `all` && platform !== tool.platform) return false;

            const categoryName = categories.find((item) => item.id === tool.category)?.name ?? ``;
            const searchable = normalize([tool.name, tool.description, categoryName, ...tool.tags].join(` `));

            return !search || searchable.includes(search);
        });

        return sort === `name`
            ? results.sort((first, second) => first.name.localeCompare(second.name))
            : results;
    }, [query, category, platform, savedOnly, savedIds, sort]);

    const value = useMemo<DirectoryState>(() => ({
        sort,
        query,
        savedIds,
        category,
        platform,
        savedOnly,
        setSort,
        setQuery,
        setCategory,
        setPlatform,
        toggleSaved,
        resetFilters,
        setSavedOnly,
        filteredTools,
        savedCount: savedIds.length,
    }), [sort, query, savedIds, category, platform, savedOnly, toggleSaved, resetFilters, filteredTools]);

    return (
        <DirectoryContext.Provider value={value}>
            {children}
        </DirectoryContext.Provider>
    );
}

export function useDirectory() {
    const context = useContext(DirectoryContext);
    if (!context) throw new Error(`useDirectory must be used inside DirectoryProvider.`);
    return context;
}
