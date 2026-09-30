import { getLogoSource } from './Logo.logic';
import type { LogoProps } from './Logo.logic';

export default function Logo({ id, icon = false, light = false, width, nativeID, className = `` }: LogoProps) {
    return (
        <img
            width={width}
            alt={`Ruler Tools`}
            draggable={false}
            id={id ?? nativeID ?? `ruler-tools-logo`}
            className={`ruler-tools-logo ${icon ? `ruler-tools-logo-icon` : ``} ${className}`}
            src={getLogoSource(icon, light)}
        />
    );
}
