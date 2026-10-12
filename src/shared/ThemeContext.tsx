import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import type { Theme, ThemePalette } from './theme';
import { isTheme, themePalettes, themeStorageKey } from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface ThemeState {
    theme: Theme;
    isDark: boolean;
    palette: ThemePalette;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeState | undefined>(undefined);
const readWebPreference = (): Theme | null => {
    if (Platform.OS !== `web` || typeof window === `undefined`) return null;
    try {
        const stored = window.localStorage.getItem(themeStorageKey);
        return isTheme(stored) ? stored : null;
    } catch {
        return null;
    }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const changed = useRef(false);
    const [preference, setPreference] = useState<Theme | null>(readWebPreference);
    const [storageReady, setStorageReady] = useState(Platform.OS === `web`);
    const theme = preference ?? `light`;

    useEffect(() => {
        if (Platform.OS === `web`) return;
        let active = true;
        const restoreTheme = async () => {
            try {
                const stored = await AsyncStorage.getItem(themeStorageKey);
                if (active && !changed.current && isTheme(stored)) setPreference(stored);
            } catch {
                console.warn(`Theme Preference Could Not Be Loaded`);
            } finally {
                if (active) setStorageReady(true);
            }
        };
        void restoreTheme();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!storageReady || !preference) return;
        void AsyncStorage.setItem(themeStorageKey, preference).catch(() => {
            console.warn(`Theme Preference Could Not Be Saved`);
        });
    }, [preference, storageReady]);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof document === `undefined`) return;
        const root = document.documentElement;
        const palette = themePalettes[theme];
        const colors = {
            '--ink': palette.ink,
            '--gold': palette.gold,
            '--navy': palette.navy,
            '--panel': palette.panel,
            '--muted': palette.muted,
            '--line': palette.border,
            '--surface': palette.surface,
            '--gold-dark': palette.goldDark,
            '--background': palette.background,
            '--surface-soft': palette.surfaceSoft,
            '--surface-warm': palette.surfaceWarm,
        };
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        Object.entries(colors).forEach(([name, value]) => root.style.setProperty(name, value));
    }, [theme]);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof window === `undefined`) return;
        const syncPreference = (event: StorageEvent) => {
            if (event.key === themeStorageKey || event.key === null) {
                setPreference(isTheme(event.newValue) ? event.newValue : null);
            }
        };
        window.addEventListener(`storage`, syncPreference);
        return () => window.removeEventListener(`storage`, syncPreference);
    }, []);

    const toggleTheme = useCallback(() => {
        changed.current = true;
        setPreference(current => (current ?? `light`) === `dark` ? `light` : `dark`);
    }, []);
    const value = useMemo(() => ({ theme, toggleTheme, isDark: theme === `dark`, palette: themePalettes[theme] }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error(`useTheme Must Be Used Within ThemeProvider`);
    return context;
};
