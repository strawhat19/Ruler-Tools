import './LandingPage.scss';
import Hero from '../Hero/Hero';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Directory from '../Directory/Directory';
import RulerMarquee from '../RulerMarquee/RulerMarquee';

export default function LandingPage() {
    return (
        <div id={`ruler-tools-page`} className={`ruler-tools-page`}>
            <a id={`skip-to-tools`} className={`skip-to-tools`} href={`#directory`}>
                {`Skip to tools`}
            </a>
            <Header />
            <main id={`ruler-tools-main`} className={`ruler-tools-main`}>
                <Hero />
                <Directory />
            </main>
            <RulerMarquee id={`featured-ruler-marquee`} />
            <Footer />
        </div>
    );
}
