import './PageScrollbar.scss';
import { useNavigation } from '../../shared/NavigationContext';
import { rulerTicks, rulerDigits, getScrollSections, usePageScrollbar, pageRulerSectionsEnabled } from './PageScrollbar.logic';

export default function PageScrollbar() {
    const { page } = useNavigation();
    const sections = getScrollSections(page);
    const { visible, railRef, scaleRef, ghostRef, needleRef, labelsRef, topPoolRef, viewportRef, bottomPoolRef } = usePageScrollbar(sections);

    return (
        <div id={`page-ruler`} className={`page-ruler`} hidden={!visible}>
            <div id={`page-ruler-pools`} className={`page-ruler-pools`} hidden={!pageRulerSectionsEnabled} aria-hidden={`true`}>
                <div ref={topPoolRef} id={`page-ruler-top-pool`} className={`page-ruler-pool page-ruler-pool--top`} />
                <div ref={bottomPoolRef} id={`page-ruler-bottom-pool`} className={`page-ruler-pool page-ruler-pool--bottom`} />
            </div>
            <div
                ref={railRef}
                tabIndex={0}
                role={`scrollbar`}
                aria-valuemin={0}
                aria-valuemax={100}
                id={`page-ruler-rail`}
                aria-valuenow={0}
                className={`page-ruler-rail`}
                aria-label={`Page position`}
                aria-orientation={`vertical`}
                aria-controls={`ruler-tools-main`}
            >
                <div ref={scaleRef} id={`page-ruler-scale`} className={`page-ruler-scale`} aria-hidden={`true`}>
                    {rulerTicks.map(tick => (
                        <div
                            key={tick}
                            id={`page-ruler-tick-${tick}`}
                            className={`page-ruler-tick ${tick % 5 === 0 ? `is-major` : ``}`}
                        >
                            <span id={`page-ruler-line-${tick}`} className={`page-ruler-tick-line`} />
                            {tick % 5 === 0 ? <span id={`page-ruler-number-${tick}`} className={`page-ruler-tick-number`}>{tick}</span> : null}
                        </div>
                    ))}
                </div>
                <div ref={viewportRef} id={`page-ruler-viewport`} className={`page-ruler-viewport`} aria-hidden={`true`} />
                <div ref={needleRef} id={`page-ruler-needle`} className={`page-ruler-needle`} aria-hidden={`true`}>
                    <span id={`page-ruler-progress`} className={`page-ruler-progress`}>
                        <span id={`page-ruler-digits`} className={`page-ruler-digits`}>
                            {[0, 1, 2].map(column => (
                                <span key={column} id={`page-ruler-digit-column-${column}`} className={`page-ruler-digit-column`}>
                                    {rulerDigits.map(digit => <span key={digit} id={`page-ruler-digit-${column}-${digit}`} className={`page-ruler-digit`}>{digit}</span>)}
                                </span>
                            ))}
                        </span>
                        <span id={`page-ruler-percent`} className={`page-ruler-percent`}>{`%`}</span>
                    </span>
                </div>
                <div ref={ghostRef} id={`page-ruler-cursor`} className={`page-ruler-cursor`} aria-hidden={`true`} />
            </div>
            <nav ref={labelsRef} id={`page-ruler-sections`} className={`page-ruler-sections`} hidden={!pageRulerSectionsEnabled} aria-label={`Page sections`}>
                {sections.map(section => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        data-section={section.id}
                        className={`page-ruler-section`}
                        id={`page-ruler-section-${section.id}`}
                        aria-label={`Jump to ${section.label}`}
                    >
                        {section.label.toUpperCase().split(``).map((letter, index) => (
                            <span
                                key={index}
                                aria-hidden={`true`}
                                className={`page-ruler-section-letter`}
                                id={`page-ruler-section-${section.id}-letter-${index}`}
                            >
                                {letter}
                            </span>
                        ))}
                    </a>
                ))}
            </nav>
        </div>
    );
}
