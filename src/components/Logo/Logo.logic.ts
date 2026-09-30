import { iconMarkup, logoMarkup } from '../../shared/logoMarkup';

export interface LogoProps {
    id?: string;
    icon?: boolean;
    light?: boolean;
    width?: number;
    nativeID?: string;
    className?: string;
}

const lightColors: Record<string, string> = {
    '#253f68': `#FFFFFF`,
    '#ffffff': `#253F68`,
    '#b67714': `#F5BD4F`,
};

export function getLogoSource(icon: boolean, light: boolean) {
    return `./brand/ruler-tools-${icon ? `icon` : `logo`}${light ? `-light` : ``}.svg`;
}

export function getLogoMarkup(icon: boolean, light: boolean) {
    const markup = icon ? iconMarkup : logoMarkup;

    return light
        ? markup.replace(/#253f68|#ffffff|#b67714/gi, (color) => lightColors[color.toLowerCase()] ?? color)
        : markup;
}
