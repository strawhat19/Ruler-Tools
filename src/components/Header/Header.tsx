import './Header.scss';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';
import { useHeader } from './Header.logic';
import RulerMarquee from '../RulerMarquee/RulerMarquee';

export default function Header() {
    const { page, pageHref, linkTo, menuOpen, setMenuOpen, browseSaved, savedCount } = useHeader();

    return (
        <header id={`site-header`} className={`site-header`}>
            <div id={`header-content`} className={`header-content page-container`}>
                <a
                    href={pageHref(`home`)}
                    id={`header-brand`}
                    className={`header-brand`}
                    aria-label={`Ruler Tools home`}
                    onClick={(event) => {
                        linkTo(`home`)(event);
                        setMenuOpen(false);
                    }}
                >
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
                    <a
                        href={pageHref(`about`)}
                        id={`nav-about`}
                        onClick={(event) => {
                            linkTo(`about`)(event);
                            setMenuOpen(false);
                        }}
                        aria-current={page === `about` ? `page` : undefined}
                        className={`nav-link ${page === `about` ? `is-active` : ``}`}
                    >
                        <Icon id={`nav-about-icon`} name={`info`} size={17} />
                        {`About`}
                    </a>
                    <a
                        href={pageHref(`terms`)}
                        id={`nav-terms`}
                        onClick={(event) => {
                            linkTo(`terms`)(event);
                            setMenuOpen(false);
                        }}
                        aria-current={page === `terms` ? `page` : undefined}
                        className={`nav-link ${page === `terms` ? `is-active` : ``}`}
                    >
                        <Icon id={`nav-terms-icon`} name={`terms`} size={17} />
                        {`Terms`}
                    </a>
                    <a
                        href={pageHref(`privacy`)}
                        id={`nav-privacy-policy`}
                        onClick={(event) => {
                            linkTo(`privacy`)(event);
                            setMenuOpen(false);
                        }}
                        aria-current={page === `privacy` ? `page` : undefined}
                        className={`nav-link ${page === `privacy` ? `is-active` : ``}`}
                    >
                        <Icon id={`nav-privacy-policy-icon`} name={`shield`} size={17} />
                        {`Privacy Policy`}
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
