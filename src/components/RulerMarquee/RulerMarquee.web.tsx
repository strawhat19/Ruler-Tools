import './RulerMarquee.scss';
import type { CSSProperties } from 'react';
import type { RulerMarqueeProps } from './RulerMarquee.logic';
import { rulerCopies, rulerTicks, rulerUnits, rulerDuration, rulerUnitWidth, getRulerTickClass } from './RulerMarquee.logic';

const rulerVariables = {
    '--ruler-group-width': `${rulerUnits.length * rulerUnitWidth}px`,
    '--ruler-duration': `${rulerDuration}ms`,
} as CSSProperties;

export default function RulerMarquee({ id, variant = `featured` }: RulerMarqueeProps) {
    return (
        <div
            id={id}
            aria-hidden={`true`}
            style={rulerVariables}
            className={`ruler-marquee ruler-marquee--${variant}`}
        >
            <div id={`${id}-track`} className={`ruler-marquee-track`}>
                {rulerCopies.map((copy) => (
                    <div
                        key={copy}
                        id={`${id}-group-${copy}`}
                        className={`ruler-marquee-group`}
                    >
                        {rulerUnits.map((unit) => (
                            <div
                                key={unit}
                                id={`${id}-unit-${copy}-${unit}`}
                                className={`ruler-marquee-unit`}
                            >
                                {rulerTicks.map((tick) => (
                                    <span
                                        key={tick}
                                        style={{ left: `${tick * 10}%` }}
                                        id={`${id}-tick-${copy}-${unit}-${tick}`}
                                        className={`ruler-marquee-tick ${getRulerTickClass(tick)}`}
                                    />
                                ))}
                                <span
                                    id={`${id}-number-${copy}-${unit}`}
                                    className={`ruler-marquee-number`}
                                >
                                    {unit}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
