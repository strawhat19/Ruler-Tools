import './InformationPage.scss';
import Icon from '../Icon/Icon';
import { useNavigation } from '../../shared/NavigationContext';
import type { InformationPageId } from './InformationPage.logic';
import { reviewDate, piratechsUrl, informationLinks, informationContent } from './InformationPage.logic';

export default function InformationPage({ page }: { page: InformationPageId }) {
    const { pageHref, linkTo } = useNavigation();
    const content = informationContent[page];
    const prefix = `information-${page}`;

    return (
        <article
            id={`${prefix}-page`}
            className={`information-page page-container`}
            aria-labelledby={`${prefix}-title`}
        >
            <a
                href={pageHref(`home`)}
                onClick={linkTo(`home`, `directory`)}
                id={`${prefix}-back-link`}
                className={`information-back-link`}
            >
                <Icon
                    name={`arrow`}
                    size={17}
                    id={`${prefix}-back-icon`}
                    className={`information-back-icon`}
                />
                <span id={`${prefix}-back-label`} className={`information-back-label`}>
                    {`Back to tools`}
                </span>
            </a>
            <header id={`${prefix}-header`} className={`information-header`}>
                <div id={`${prefix}-icon-wrap`} className={`information-icon-wrap`}>
                    <Icon
                        size={28}
                        name={content.icon}
                        id={`${prefix}-icon`}
                        className={`information-icon`}
                    />
                </div>
                <p id={`${prefix}-eyebrow`} className={`information-eyebrow section-eyebrow`}>
                    {content.eyebrow}
                </p>
                <h1 id={`${prefix}-title`} className={`information-title`}>
                    {content.title}
                </h1>
                <p id={`${prefix}-description`} className={`information-description`}>
                    {content.description}
                </p>
                <p id={`${prefix}-review-date`} className={`information-review-date`}>
                    {`Last reviewed: ${reviewDate}`}
                </p>
            </header>
            <div id={`${prefix}-layout`} className={`information-layout`}>
                <div id={`${prefix}-sections`} className={`information-sections`}>
                    {content.sections.map((section) => (
                        <section
                            key={section.id}
                            className={`information-section`}
                            id={`${prefix}-section-${section.id}`}
                            aria-labelledby={`${prefix}-heading-${section.id}`}
                        >
                            <h2
                                className={`information-section-title`}
                                id={`${prefix}-heading-${section.id}`}
                            >
                                {section.title}
                            </h2>
                            {section.paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={`information-section-paragraph`}
                                    id={`${prefix}-paragraph-${section.id}-${index}`}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                </div>
                <aside id={`${prefix}-related`} className={`information-related`}>
                    <h2 id={`${prefix}-related-title`} className={`information-related-title`}>
                        {`More about Ruler Tools`}
                    </h2>
                    <nav
                        aria-label={`Related pages`}
                        id={`${prefix}-related-navigation`}
                        className={`information-related-navigation`}
                    >
                        {informationLinks.filter((link) => link.page !== page).map((link) => (
                            <a
                                key={link.page}
                                href={pageHref(link.page)}
                                onClick={linkTo(link.page)}
                                className={`information-related-link`}
                                id={`${prefix}-related-link-${link.page}`}
                            >
                                <Icon
                                    size={17}
                                    name={link.icon}
                                    className={`information-related-icon`}
                                    id={`${prefix}-related-icon-${link.page}`}
                                />
                                <span
                                    className={`information-related-label`}
                                    id={`${prefix}-related-label-${link.page}`}
                                >
                                    {link.label}
                                </span>
                            </a>
                        ))}
                    </nav>
                    <a
                        target={`_blank`}
                        href={piratechsUrl}
                        rel={`noopener noreferrer`}
                        id={`${prefix}-piratechs-link`}
                        className={`information-piratechs-link`}
                        aria-label={`Visit Piratechs (opens in a new tab)`}
                    >
                        <Icon
                            size={17}
                            name={`external`}
                            id={`${prefix}-piratechs-icon`}
                            className={`information-piratechs-icon`}
                        />
                        <span id={`${prefix}-piratechs-label`} className={`information-piratechs-label`}>
                            {`Visit Piratechs`}
                        </span>
                    </a>
                </aside>
            </div>
        </article>
    );
}
