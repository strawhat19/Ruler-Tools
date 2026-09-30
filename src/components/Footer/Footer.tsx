import './Footer.scss';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';
import { useFooter } from './Footer.logic';

export default function Footer() {
    const { browseTools } = useFooter();

    return (
        <footer id={`site-footer`} className={`site-footer`}>
            <section id={`about`} className={`about-section page-container`} aria-labelledby={`about-title`}>
                <div id={`about-icon-wrap`} className={`about-icon-wrap`}>
                    <Logo id={`about-crown`} className={`about-crown`} icon={true} light />
                </div>
                <div id={`about-copy`} className={`about-copy`}>
                    <p id={`about-eyebrow`} className={`section-eyebrow`}>{`OUR PHILOSOPHY IS SIMPLE`}</p>
                    <h2 id={`about-title`} className={`about-title`}>{`Good tools. Less friction.`}</h2>
                    <p id={`about-description`} className={`about-description`}>
                        {`You don’t need a hundred tabs. You need the right one. We bring useful tools together so you can spend less time looking and more time getting things done.`}
                    </p>
                </div>
                <a id={`about-browse`} className={`about-browse`} href={`#directory`} onClick={browseTools}>
                    {`Find your tool`}
                    <Icon id={`about-browse-icon`} name={`arrow`} size={17} />
                </a>
            </section>
            <div id={`footer-bottom`} className={`footer-bottom page-container`}>
                <a id={`footer-brand`} className={`footer-brand`} href={`#`} aria-label={`Back to Ruler Tools home`}>
                    <Logo id={`footer-logo`} className={`footer-logo`} light />
                </a>
                <p id={`footer-tagline`} className={`footer-tagline`}>{`One Tool to Rule Them All.`}</p>
                <span id={`footer-storage-note`} className={`footer-storage-note`}>
                    <Icon id={`footer-storage-icon`} name={`bookmark`} size={13} />
                    {`Your toolkit stays on your device.`}
                </span>
            </div>
        </footer>
    );
}
