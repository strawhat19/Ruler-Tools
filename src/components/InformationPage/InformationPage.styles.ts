import { StyleSheet } from 'react-native';
import { palette } from '../LandingPage/LandingPage.styles';

export const styles = StyleSheet.create({
    page: {
        gap: 30,
        width: `100%`,
        maxWidth: 900,
        paddingTop: 28,
        paddingBottom: 42,
        alignSelf: `center`,
    },
    backLink: {
        gap: 8,
        alignSelf: `flex-start`,
        flexDirection: `row`,
        alignItems: `center`,
    },
    backText: {
        fontSize: 13,
        fontWeight: `600`,
        color: palette.muted,
    },
    header: { gap: 16 },
    iconWrap: {
        width: 58,
        height: 58,
        borderRadius: 16,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: palette.surfaceWarm,
    },
    icon: {
        fontSize: 30,
        color: palette.navy,
    },
    eyebrow: {
        fontSize: 10,
        fontWeight: `700`,
        letterSpacing: 1.5,
        color: palette.goldDark,
    },
    title: {
        fontSize: 39,
        lineHeight: 45,
        fontWeight: `800`,
        letterSpacing: -1.5,
        color: palette.navy,
    },
    description: {
        fontSize: 16,
        lineHeight: 27,
        color: palette.muted,
    },
    reviewDate: {
        fontSize: 12,
        color: palette.muted,
    },
    section: {
        gap: 13,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: palette.border,
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 27,
        fontWeight: `700`,
        letterSpacing: -0.4,
        color: palette.navy,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 25,
        color: palette.muted,
    },
    related: {
        gap: 20,
        padding: 24,
        borderWidth: 1,
        borderRadius: 18,
        borderColor: palette.border,
        backgroundColor: palette.surfaceSoft,
    },
    relatedTitle: {
        fontSize: 14,
        fontWeight: `700`,
        color: palette.navy,
    },
    relatedLink: {
        gap: 9,
        flexDirection: `row`,
        alignItems: `center`,
    },
    relatedText: {
        fontSize: 14,
        fontWeight: `600`,
        color: palette.navy,
    },
    piratechsLink: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: palette.border,
    },
    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
});
