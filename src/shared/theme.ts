export type Theme = `light` | `dark`;

export interface ThemePalette {
    ink: string;
    navy: string;
    gold: string;
    panel: string;
    muted: string;
    border: string;
    surface: string;
    goldDark: string;
    background: string;
    onNavyText: string;
    onNavyTick: string;
    surfaceSoft: string;
    surfaceWarm: string;
    onNavyMuted: string;
    onNavyBorder: string;
}

const lightPalette: ThemePalette = {
    ink: `#253f68`,
    navy: `#253f68`,
    gold: `#f5bd4f`,
    panel: `#ffffff`,
    goldDark: `#b67714`,
    background: `#ffffff`,
    onNavyText: `#ffffff`,
    muted: `rgba(37,63,104,0.64)`,
    border: `rgba(37,63,104,0.12)`,
    surface: `rgba(37,63,104,0.05)`,
    onNavyTick: `rgba(255,255,255,0.4)`,
    surfaceSoft: `rgba(37,63,104,0.025)`,
    surfaceWarm: `rgba(245,189,79,0.16)`,
    onNavyMuted: `rgba(255,255,255,0.7)`,
    onNavyBorder: `rgba(255,255,255,0.28)`,
};

export const themePalettes: Record<Theme, ThemePalette> = {
    light: lightPalette,
    dark: {
        ...lightPalette,
        ink: `#edf3ff`,
        panel: `#182941`,
        goldDark: `#f5bd4f`,
        background: `#101b2d`,
        muted: `rgba(237,243,255,0.68)`,
        border: `rgba(237,243,255,0.14)`,
        surface: `rgba(237,243,255,0.07)`,
        surfaceSoft: `rgba(237,243,255,0.035)`,
        surfaceWarm: `rgba(245,189,79,0.10)`,
    },
};

export const themeStorageKey = `ruler-tools:theme`;
export const isTheme = (value: unknown): value is Theme => value === `light` || value === `dark`;
