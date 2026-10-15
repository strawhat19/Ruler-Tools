import AsyncStorage from '@react-native-async-storage/async-storage';
export interface LocalProfile { name: string; bio: string; }
export interface LocalToolkit { name: string; toolIds: string[]; }
export interface LocalWorkspace { version: 1; profile: LocalProfile; toolkits: LocalToolkit[]; }
const key = `ruler-tools:local-workspace:v1`;
const empty = (): LocalWorkspace => ({ version: 1, profile: { name: ``, bio: `` }, toolkits: [] });
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === `object` && value !== null && !Array.isArray(value);
export const readLocalWorkspace = async (validToolIds: Set<string>): Promise<LocalWorkspace> => {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return empty();
    if (raw.length > 100_000) throw new Error(`Stored workspace is too large.`);
    const value: unknown = JSON.parse(raw);
    if (!isObject(value) || value.version !== 1 || !isObject(value.profile) || !Array.isArray(value.toolkits)
        || typeof value.profile.name !== `string` || value.profile.name.length > 100
        || typeof value.profile.bio !== `string` || value.profile.bio.length > 1000
        || value.toolkits.length > 20) throw new Error(`Stored workspace cannot be read.`);
    const toolkits = value.toolkits.map((item): LocalToolkit => {
        if (!isObject(item) || typeof item.name !== `string` || !item.name.trim() || item.name.length > 60
            || !Array.isArray(item.toolIds) || item.toolIds.length > 100 || !item.toolIds.every(id => typeof id === `string`)) throw new Error(`Stored toolkit cannot be read.`);
        return { name: item.name, toolIds: [...new Set(item.toolIds.filter((id): id is string => typeof id === `string` && validToolIds.has(id)))] };
    });
    return { version: 1, profile: { name: value.profile.name, bio: value.profile.bio }, toolkits };
};
// Device-only drafts. This is not authentication or cloud account storage.
export const writeLocalWorkspace = (workspace: LocalWorkspace) => AsyncStorage.setItem(key, JSON.stringify(workspace));
export const clearLocalWorkspace = () => AsyncStorage.removeItem(key);
