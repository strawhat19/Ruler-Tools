import './Header.scss';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';
import { useHeader } from './Header.logic';
import RulerMarquee from '../RulerMarquee/RulerMarquee';

export default function Header() {
    const {
        page, pageHref, linkTo, signOut,
        menuOpen, isSignedIn, openAccount,
        setMenuOpen, browseSaved,
    } = useHeader();

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
                <div id={`header-account-actions`} className={`header-account-actions`}>
                    {isSignedIn ? (
                        <>
                            <button
                                type={`button`}
                                id={`header-saved`}
                                className={`header-saved`}
                                onClick={() => {
                                    setMenuOpen(false);
                                    browseSaved();
                                }}
                            >
                                <Icon id={`header-saved-icon`} name={`bookmark`} size={17} />
                                <span id={`header-saved-label`} className={`header-saved-label`}>
                                    {`Toolkits`}
                                </span>
                            </button>
                            <button
                                type={`button`}
                                id={`header-sign-out`}
                                className={`header-sign-out`}
                                title={`Exit account preview`}
                                aria-label={`Exit account preview`}
                                onClick={() => {
                                    setMenuOpen(false);
                                    signOut();
                                }}
                            >
                                <Icon id={`header-sign-out-icon`} name={`log-out`} size={17} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type={`button`}
                                id={`header-sign-in`}
                                className={`header-account-button header-sign-in`}
                                onClick={() => {
                                    setMenuOpen(false);
                                    openAccount(`sign-in`);
                                }}
                            >
                                <Icon id={`header-sign-in-icon`} name={`log-in`} size={17} />
                                <span id={`header-sign-in-label`} className={`header-account-label header-sign-in-label`}>
                                    {`Sign In`}
                                </span>
                            </button>
                            <button
                                type={`button`}
                                id={`header-sign-up`}
                                className={`header-account-button header-sign-up`}
                                onClick={() => {
                                    setMenuOpen(false);
                                    openAccount(`sign-up`);
                                }}
                            >
                                <Icon id={`header-sign-up-icon`} name={`user-plus`} size={17} />
                                <span id={`header-sign-up-label`} className={`header-account-label header-sign-up-label`}>
                                    {`Sign Up`}
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
            <RulerMarquee id={`header-ruler-marquee`} variant={`slim`} />
        </header>
    );
}
