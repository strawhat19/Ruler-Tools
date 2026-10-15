import { useEffect, useRef, useState } from 'react';
import { readLocalWorkspace, writeLocalWorkspace, clearLocalWorkspace, type LocalProfile, type LocalToolkit } from '../../shared/readiness/localWorkspace';
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
    const [ready, setReady] = useState(false);
    const [localError, setLocalError] = useState(``);
    const [localNotice, setLocalNotice] = useState(``);
    const [profile, setProfile] = useState<LocalProfile>({ name: ``, bio: `` });
    const [profileDraft, setProfileDraft] = useState<LocalProfile>({ name: ``, bio: `` });
    const queue = useRef<Promise<void>>(Promise.resolve());
    const writable = useRef(false);
    const clearing = useRef(false);
    const [name, setName] = useState(``);
    const [preview, setPreview] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [drafts, setDrafts] = useState<LocalToolkit[]>([]);
    useEffect(() => {
        let active = true;
        readLocalWorkspace(new Set(tools.map(tool => tool.id))).then(value => {
            if (!active) return;
            setDrafts(value.toolkits); setProfile(value.profile); setProfileDraft(value.profile);
            writable.current = true; setReady(true);
        }).catch(() => {
            if (!active) return;
            setLocalError(`Device storage could not be read. Existing data is preserved. Clear local workspace to start again.`);
            setReady(true);
        });
        return () => { active = false; };
    }, []);
    useEffect(() => {
        if (!ready || !writable.current) return;
        const value = { version: 1 as const, profile, toolkits: drafts };
        queue.current = queue.current.catch(() => undefined).then(() => writeLocalWorkspace(value)).then(() => {
            setLocalError(``); setLocalNotice(`Saved on this device only`);
        }).catch(() => { setLocalError(`Device save failed. Latest changes are only in memory; try again before leaving.`); setLocalNotice(``); });
    }, [ready, profile, drafts]);
    const clearLocal = async () => {
        if (clearing.current) return;
        clearing.current = true;
        setReady(false);
        try {
            await queue.current;
            await clearLocalWorkspace();
            writable.current = true; setDrafts([]); setProfile({ name: ``, bio: `` }); setProfileDraft({ name: ``, bio: `` });
            setLocalError(``); setLocalNotice(`Local workspace cleared`);
        } catch { setLocalError(`Could not clear device storage. No reset confirmed.`); }
        finally { clearing.current = false; setReady(true); }
    };
    const retryLocalSave = () => { if (ready && writable.current) setProfile(current => ({ ...current })); };
    const saveLocalProfile = () => {
        if (!ready || !writable.current) return;
        setProfile({ name: profileDraft.name.trim().slice(0, 100), bio: profileDraft.bio.trim().slice(0, 1000) });
    };
    const saved = tools.filter(tool => directory.savedIds.includes(tool.id));
    const createDraft = () => {
        const value = name.trim();
        if (!ready || !writable.current || !value || value.length > 60 || drafts.length >= 20) return;
        setDrafts(current => [...current, { name: value, toolIds: selected.filter(id => directory.savedIds.includes(id)) }]);
        setName(``); setSelected([]);
    };
    const toggleSelected = (id: string) => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
    return { retryLocalSave, ready, localError, localNotice, profileDraft, setProfileDraft, saveLocalProfile, clearLocal, canSave: ready && writable.current, ...navigation, ...directory, saved, name, setName, preview, setPreview, drafts, setDrafts, selected, toggleSelected, createDraft, meta: routeRegistry[navigation.page] };
};
