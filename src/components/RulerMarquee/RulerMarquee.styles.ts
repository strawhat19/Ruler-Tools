import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    marquee: {
        height: 90,
        overflow: `hidden`,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginHorizontal: -24,
        borderTopColor: `#253f68`,
        borderBottomColor: `#253f68`,
        backgroundColor: `#f5bd4f`,
    },
    featured: {
        marginBottom: 0,
    },
    slim: {
        height: 28,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: `#ffffff`,
    },
    track: {
        height: `100%`,
        flexDirection: `row`,
    },
    group: {
        flexShrink: 0,
        height: `100%`,
        flexDirection: `row`,
    },
    unit: {
        flexShrink: 0,
        height: `100%`,
        position: `relative`,
    },
    tick: {
        top: 0,
        width: 1,
        height: 14,
        position: `absolute`,
        backgroundColor: `rgba(37,63,104,0.35)`,
    },
    midTick: {
        height: 24,
        backgroundColor: `rgba(37,63,104,0.7)`,
    },
    majorTick: {
        width: 2,
        height: 37,
        backgroundColor: `#253f68`,
    },
    slimTick: {
        height: 6,
        backgroundColor: `rgba(37,63,104,0.24)`,
    },
    slimMidTick: {
        height: 9,
        backgroundColor: `rgba(37,63,104,0.48)`,
    },
    slimMajorTick: {
        height: 13,
        backgroundColor: `#f5bd4f`,
    },
    label: {
        top: 44,
        left: 7,
        fontSize: 20,
        fontWeight: `600`,
        position: `absolute`,
        fontVariant: [`tabular-nums`],
        color: `#253f68`,
    },
    slimLabel: {
        top: 15,
        left: 4,
        fontSize: 8,
        lineHeight: 10,
        color: `rgba(37,63,104,0.58)`,
    },
});
