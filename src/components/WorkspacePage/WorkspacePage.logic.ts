import { useState } from 'react';
import { tools } from '../../shared/catalog';
import { useDirectory } from '../../shared/DirectoryContext';
import { routeRegistry, type PageId } from '../../shared/routes';
import { useNavigation } from '../../shared/NavigationContext';

export const accountRoutes: PageId[] = [`profile`, `connections`, `saved`, `toolkits`];
export const adminRoutes: PageId[] = [`dashboard`, `analytics`, `users`, `catalog`, `features`, `feedback`];
export const recordsColumns: Partial<Record<PageId, string[]>> = {
    users: [`No.`, `User`, `Email`, `Role`, `Status`, `Actions`],
    catalog: [`No.`, `Tool`, `Category`, `Platform`, `Status`, `Actions`],
    features: [`No.`, `Feature`, `Description`, `Value`, `Plans`, `Actions`],
    feedback: [`No.`, `Subject`, `Category`, `Status`, `Received`, `Actions`],
};
export const useWorkspacePage = () => {
    const navigation = useNavigation();
    const directory = useDirectory();
    const [name, setName] = useState(``);
    const [preview, setPreview] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [drafts, setDrafts] = useState<{ name: string; toolIds: string[] }[]>([]);
    const saved = tools.filter(tool => directory.savedIds.includes(tool.id));
    const createDraft = () => {
        const value = name.trim();
        if (!value || value.length > 60 || drafts.length >= 20) return;
        setDrafts(current => [...current, { name: value, toolIds: selected.filter(id => directory.savedIds.includes(id)) }]);
        setName(``); setSelected([]);
    };
    const toggleSelected = (id: string) => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
    return { ...navigation, ...directory, saved, name, setName, preview, setPreview, drafts, setDrafts, selected, toggleSelected, createDraft, meta: routeRegistry[navigation.page] };
};
