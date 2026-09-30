import { SvgXml } from 'react-native-svg';
import { getLogoMarkup } from './Logo.logic';
import type { LogoProps } from './Logo.logic';

export default function Logo({ id, nativeID, icon = false, light = false, width = 190, className = `ruler-tools-logo` }: LogoProps) {
    return (
        <SvgXml
            width={width}
            nativeID={nativeID ?? id ?? `ruler-tools-logo`}
            accessibilityLabel={`Ruler Tools`}
            xml={getLogoMarkup(icon, light)}
            height={icon ? width : width * (128 / 405)}
            viewBox={icon ? `32 29 128 128` : `24 24 405 128`}
            {...{ className }}
        />
    );
}
