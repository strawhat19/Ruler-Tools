import './Showcase.scss';
import Icon from '../Icon/Icon';
import { useShowcase } from './Showcase.logic';

export default function Showcase() {
    const { pageHref, exploreMeasuring } = useShowcase();

    return (
        <div id={`hero-showcase`} className={`hero-showcase`}>
            <div id={`showcase-topline`} className={`showcase-topline`}>
                <span id={`showcase-collection-label`} className={`showcase-collection-label`}>{`THE EVERYDAY TOOLKIT`}</span>
                <span id={`showcase-collection-number`} className={`showcase-collection-number`}>{`NO. 001`}</span>
            </div>
            <div id={`showcase-main`} className={`showcase-main`}>
                <div id={`showcase-grid`} className={`showcase-grid`} aria-hidden={true} />
                <span id={`showcase-featured-label`} className={`showcase-featured-label`}>
                    <Icon id={`showcase-featured-icon`} name={`ruler`} size={14} />
                    {`A little more precision`}
                </span>
                <h2 id={`showcase-title`} className={`showcase-title`}>
                    {`Measure twice.`}<br id={`showcase-title-break`} className={`showcase-title-break`} />
                    <span id={`showcase-title-accent`} className={`showcase-title-accent`}>{`Click once.`}</span>
                </h2>
                <svg
                    role={`img`}
                    viewBox={`0 0 310 154`}
                    id={`showcase-protractor`}
                    className={`showcase-protractor`}
                    aria-labelledby={`showcase-protractor-title`}
                >
                    <title id={`showcase-protractor-title`} className={`showcase-protractor-title`}>{`A precision protractor set to 90 degrees`}</title>
                    <path id={`protractor-outer`} className={`protractor-outer`} d={`M 26 133 A 129 129 0 0 1 284 133`} fill={`none`} stroke={`rgba(255, 255, 255, .35)`} strokeWidth={`1`} />
                    <path id={`protractor-inner`} className={`protractor-inner`} d={`M 59 133 A 96 96 0 0 1 251 133`} fill={`none`} stroke={`rgba(255, 255, 255, .18)`} strokeWidth={`1`} />
                    {Array.from({ length: 37 }, (_, index) => {
                        const angle = (index * 5 * Math.PI) / 180;
                        const length = index % 6 === 0 ? 18 : index % 3 === 0 ? 12 : 7;

                        return (
                            <line
                                key={index}
                                id={`protractor-tick-${index}`}
                                className={`protractor-tick ${index % 6 === 0 ? `protractor-tick-major` : ``}`}
                                x1={155 - Math.cos(angle) * 129}
                                y1={133 - Math.sin(angle) * 129}
                                x2={155 - Math.cos(angle) * (129 - length)}
                                y2={133 - Math.sin(angle) * (129 - length)}
                                stroke={index % 6 === 0 ? `var(--gold)` : `rgba(255, 255, 255, .4)`}
                                strokeWidth={index % 6 === 0 ? 1.5 : 1}
                            />
                        );
                    })}
                    <line id={`protractor-base`} className={`protractor-base`} x1={`10`} x2={`300`} y1={`134`} y2={`134`} stroke={`rgba(255, 255, 255, .5)`} />
                    <line id={`protractor-pointer`} className={`protractor-pointer`} x1={`155`} x2={`155`} y1={`133`} y2={`35`} stroke={`var(--gold)`} strokeWidth={`2`} />
                    <circle id={`protractor-pivot`} className={`protractor-pivot`} cx={`155`} cy={`133`} r={`5`} fill={`var(--gold)`} />
                    <text id={`protractor-angle`} className={`protractor-angle`} x={`170`} y={`113`} fill={`var(--gold)`} fontSize={`15`}>{`90°`}</text>
                    <text id={`protractor-zero`} className={`protractor-zero`} x={`22`} y={`151`} fill={`rgba(255, 255, 255, .65)`} fontSize={`9`}>{`0`}</text>
                    <text id={`protractor-end`} className={`protractor-end`} x={`271`} y={`151`} fill={`rgba(255, 255, 255, .65)`} fontSize={`9`}>{`180`}</text>
                </svg>
                <a
                    id={`showcase-link`}
                    className={`showcase-link`}
                    href={pageHref(`home`)}
                    onClick={exploreMeasuring}
                >
                    {`Explore measuring tools`}
                    <Icon id={`showcase-link-icon`} name={`arrow`} size={15} />
                </a>
            </div>
            <div id={`showcase-mini-cards`} className={`showcase-mini-cards`}>
                <div id={`showcase-calculator`} className={`showcase-mini-card`}>
                    <span id={`showcase-calculator-icon-wrap`} className={`showcase-mini-icon is-blue`}>
                        <Icon id={`showcase-calculator-icon`} name={`calculator`} size={22} />
                    </span>
                    <div id={`showcase-calculator-copy`} className={`showcase-mini-copy`}>
                        <span id={`showcase-calculator-label`} className={`showcase-mini-label`}>{`Big ideas.`}</span>
                        <span id={`showcase-calculator-title`} className={`showcase-mini-title`}>{`Simple answers.`}</span>
                    </div>
                </div>
                <div id={`showcase-level`} className={`showcase-mini-card`}>
                    <span id={`showcase-level-icon-wrap`} className={`showcase-mini-icon is-gold`}>
                        <Icon id={`showcase-level-icon`} name={`gauge`} size={22} />
                    </span>
                    <div id={`showcase-level-copy`} className={`showcase-mini-copy`}>
                        <span id={`showcase-level-label`} className={`showcase-mini-label`}>{`Every angle.`}</span>
                        <span id={`showcase-level-title`} className={`showcase-mini-title`}>{`Covered.`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
