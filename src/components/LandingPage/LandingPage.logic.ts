import type { Platform, ToolIcon } from '../../shared/types';

export const elementProps = (className: string, suffix?: string) => ({
    className,
    nativeID: suffix ? `${className}-${suffix}` : className,
});

export const platformFilters: { id: Platform; label: string; icon: string }[] = [
    { id: `all`, label: `All platforms`, icon: `⊞` },
    { id: `website`, label: `Websites`, icon: `◎` },
    { id: `extension`, label: `Extensions`, icon: `▦` },
    { id: `app`, label: `Apps`, icon: `▯` },
];

export const toolSymbols: Record<ToolIcon, string> = {
    type: `Aa`,
    code: `</>`,
    scan: `⌗`,
    gauge: `◉`,
    ruler: `╱`,
    palette: `◌`,
    pipette: `◈`,
    compass: `↗`,
    convert: `⇄`,
    calculator: `±`,
};

export const toolColors: Record<string, { background: string; foreground: string }> = {
    gold: { background: `rgba(245,189,79,0.16)`, foreground: `#b67714` },
    blue: { background: `rgba(37,63,104,0.05)`, foreground: `#253f68` },
    pink: { background: `#fdeef3`, foreground: `#b66585` },
    green: { background: `#eaf5ee`, foreground: `#438565` },
    orange: { background: `#fff0e5`, foreground: `#be7943` },
    purple: { background: `#f1eefa`, foreground: `#8c73b6` },
};
