import './Header.scss';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';
import { useHeader } from './Header.logic';
import RulerMarquee from '../RulerMarquee/RulerMarquee';

export default function Header() {
    const { menuOpen, setMenuOpen, browseTools, browseSaved, savedCount } = useHeader();

    return (
        <header id={`site-header`} className={`site-header`}>
            <div id={`header-content`} className={`header-content page-container`}>
                <a id={`header-brand`} className={`header-brand`} href={`#`} aria-label={`Ruler Tools home`}>
                    <Logo id={`header-logo`} className={`header-logo`} light />
                </a>
                <button
                    type={`button`}
                    id={`header-menu-toggle`}
                    className={`header-menu-toggle`}
                    aria-controls={`header-navigation`}
                    aria-expanded={menuOpen}
                    aria-label={menuOpen ? `Close navigation` : `Open navigation`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Icon id={`header-menu-icon`} name={menuOpen ? `x` : `menu`} />
                </button>
                <nav
                    id={`header-navigation`}
                    aria-label={`Main navigation`}
                    className={`header-navigation ${menuOpen ? `is-open` : ``}`}
                >
                    <a id={`nav-explore`} className={`nav-link is-active`} href={`#directory`} onClick={browseTools}>
                        <Icon id={`nav-explore-icon`} name={`compass`} size={17} />
                        {`Explore tools`}
                    </a>
                    <a id={`nav-categories`} className={`nav-link`} href={`#categories`} onClick={() => setMenuOpen(false)}>
                        <Icon id={`nav-categories-icon`} name={`filters`} size={17} />
                        {`Categories`}
                    </a>
                    <a id={`nav-about`} className={`nav-link`} href={`#about`} onClick={() => setMenuOpen(false)}>
                        <Icon id={`nav-about-icon`} name={`heart`} size={17} />
                        {`Our philosophy`}
                    </a>
                </nav>
                <button id={`header-saved`} className={`header-saved`} type={`button`} onClick={browseSaved}>
                    <Icon id={`header-saved-icon`} name={`bookmark`} size={17} />
                    <span id={`header-saved-label`} className={`header-saved-label`}>{`My toolkit`}</span>
                    {savedCount > 0 && (
                        <span id={`header-saved-count`} className={`header-saved-count`}>{savedCount}</span>
                    )}
                </button>
            </div>
            <RulerMarquee id={`header-ruler-marquee`} variant={`slim`} />
        </header>
    );
}
