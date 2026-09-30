import { StyleSheet } from 'react-native';
import { palette } from '../LandingPage/LandingPage.styles';

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        padding: 24,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `rgba(18,31,53,0.6)`,
    },
    backdropDismiss: {
        ...StyleSheet.absoluteFillObject,
    },
    dialog: {
        gap: 14,
        padding: 28,
        width: `100%`,
        maxWidth: 420,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: palette.border,
        backgroundColor: palette.background,
    },
    close: {
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 10,
        position: `absolute`,
        alignItems: `center`,
        justifyContent: `center`,
    },
    closeIcon: {
        fontSize: 27,
        color: palette.navy,
    },
    emblem: {
        width: 52,
        height: 52,
        borderRadius: 14,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: palette.surfaceWarm,
    },
    emblemIcon: {
        fontSize: 26,
        color: palette.goldDark,
    },
    title: {
        fontSize: 28,
        fontWeight: `700`,
        letterSpacing: -0.6,
        color: palette.navy,
    },
    description: {
        fontSize: 15,
        lineHeight: 25,
        color: palette.muted,
    },
    notice: {
        padding: 15,
        fontSize: 13,
        lineHeight: 22,
        borderRadius: 10,
        color: palette.navy,
        backgroundColor: palette.surfaceWarm,
    },
    toolkitButton: {
        gap: 9,
        minHeight: 48,
        borderRadius: 10,
        paddingVertical: 13,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: palette.gold,
    },
    toolkitLabel: {
        fontSize: 14,
        fontWeight: `700`,
        color: palette.navy,
    },
    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
});
