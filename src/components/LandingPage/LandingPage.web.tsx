import './LandingPage.scss';
import Hero from '../Hero/Hero';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Directory from '../Directory/Directory';
import RulerMarquee from '../RulerMarquee/RulerMarquee';
import { useNavigation } from '../../shared/NavigationContext';
import InformationPage from '../InformationPage/InformationPage';

export default function LandingPage() {
    const { page, pageHref } = useNavigation();

    return (
        <div id={`ruler-tools-page`} className={`ruler-tools-page`}>
            <a
                id={`skip-to-tools`}
                className={`skip-to-tools`}
                href={pageHref(page)}
                onClick={(event) => {
                    event.preventDefault();
                    const main = document.getElementById(`ruler-tools-main`);
                    const target = page === `home` ? document.getElementById(`directory`) : main;

                    target?.scrollIntoView({ behavior: `smooth` });
                    main?.focus({ preventScroll: true });
                }}
            >
                {page === `home` ? `Skip to tools` : `Skip to content`}
            </a>
            <Header />
            <main id={`ruler-tools-main`} className={`ruler-tools-main`} tabIndex={-1}>
                {page === `home` ? (
                    <>
                        <Hero />
                        <Directory />
                    </>
                ) : (
                    <InformationPage page={page} />
                )}
            </main>
            <RulerMarquee id={`featured-ruler-marquee`} />
            <Footer />
        </div>
    );
}
