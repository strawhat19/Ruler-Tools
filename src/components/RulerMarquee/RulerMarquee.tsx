import { useEffect, useRef, useState } from 'react';
import { styles } from './RulerMarquee.styles';
import { elementProps } from '../LandingPage/LandingPage.logic';
import type { RulerMarqueeProps } from './RulerMarquee.logic';
import { Animated, View, Text, Easing, AccessibilityInfo } from 'react-native';
import { rulerTicks, rulerUnits, rulerDuration, rulerUnitWidth } from './RulerMarquee.logic';

export default function RulerMarquee({ id, variant = `featured` }: RulerMarqueeProps) {
    const slim = variant === `slim`;
    const groupWidth = rulerUnits.length * rulerUnitWidth;
    const translation = useRef(new Animated.Value(slim ? -groupWidth : 0)).current;
    const [reducedMotion, setReducedMotion] = useState(true);

    useEffect(() => {
        let mounted = true;
        const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, setReducedMotion);

        AccessibilityInfo.isReduceMotionEnabled()
            .then((enabled) => {
                if (mounted) setReducedMotion(enabled);
            })
            .catch(() => {
                if (mounted) setReducedMotion(true);
            });

        return () => {
            mounted = false;
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        translation.setValue(slim ? -groupWidth : 0);
        if (reducedMotion) return;

        const animation = Animated.loop(
            Animated.timing(translation, {
                toValue: slim ? 0 : -groupWidth,
                easing: Easing.linear,
                duration: rulerDuration,
                isInteraction: false,
                useNativeDriver: true,
            }),
        );

        animation.start();
        return () => animation.stop();
    }, [slim, groupWidth, translation, reducedMotion]);

    return (
        <View
            accessible={false}
            pointerEvents={`none`}
            accessibilityElementsHidden
            importantForAccessibility={`no-hide-descendants`}
            style={[styles.marquee, slim ? styles.slim : styles.featured]}
            {...elementProps(`ruler-marquee`, id)}
        >
            <Animated.View
                style={[
                    styles.track,
                    {
                        width: groupWidth * 2,
                        transform: [{ translateX: translation }],
                    },
                ]}
                {...elementProps(`ruler-marquee-track`, id)}
            >
                {[0, 1].map((copy) => (
                    <View
                        key={copy}
                        style={[styles.group, { width: groupWidth }]}
                        {...elementProps(`ruler-marquee-group`, `${id}-${copy}`)}
                    >
                        {rulerUnits.map((unit) => (
                            <View
                                key={unit}
                                style={[styles.unit, { width: rulerUnitWidth }]}
                                {...elementProps(`ruler-marquee-unit`, `${id}-${copy}-${unit}`)}
                            >
                                {rulerTicks.map((tick) => (
                                    <View
                                        key={tick}
                                        style={[
                                            styles.tick,
                                            tick === 5 && styles.midTick,
                                            tick === 0 && styles.majorTick,
                                            slim && styles.slimTick,
                                            slim && tick === 5 && styles.slimMidTick,
                                            slim && tick === 0 && styles.slimMajorTick,
                                            { left: tick * rulerUnitWidth / rulerTicks.length },
                                        ]}
                                        {...elementProps(`ruler-marquee-tick`, `${id}-${copy}-${unit}-${tick}`)}
                                    />
                                ))}
                                <Text
                                    style={[styles.label, slim && styles.slimLabel]}
                                    {...elementProps(`ruler-marquee-label`, `${id}-${copy}-${unit}`)}
                                >
                                    {unit}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </Animated.View>
        </View>
    );
}
