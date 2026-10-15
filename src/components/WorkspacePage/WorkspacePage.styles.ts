import { StyleSheet } from 'react-native';
import type { ThemePalette } from '../../shared/theme';
export const createStyles = (palette: ThemePalette) => StyleSheet.create({
    page: { padding: 20, gap: 16 },
    card: { padding: 20, gap: 12, borderRadius: 16, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.panel },
    title: { fontSize: 30, fontWeight: `800`, color: palette.ink },
    heading: { fontSize: 18, fontWeight: `700`, color: palette.ink },
    body: { fontSize: 14, lineHeight: 22, color: palette.muted },
    row: { flexDirection: `row`, flexWrap: `wrap`, gap: 10, alignItems: `center` },
    button: { padding: 12, borderRadius: 8, backgroundColor: palette.surfaceWarm },
    label: { fontSize: 14, color: palette.ink },
    disabled: { opacity: .55 },
    input: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: palette.border, color: palette.ink },
    notice: { padding: 16, borderRadius: 10, backgroundColor: palette.surfaceWarm },
});
