import './Hero.scss';
import Icon from '../Icon/Icon';
import { tools, categories } from '../../shared/catalog';
import { useHero } from './Hero.logic';
import Showcase from '../Showcase/Showcase';

const popularSearches = [
    { id: `calculator`, label: `Calculator`, query: `calculator` },
    { id: `screen-ruler`, label: `Screen ruler`, query: `ruler` },
    { id: `level`, label: `Level`, query: `level` },
];

export default function Hero() {
    const { query, setQuery, searchRef, searchTools } = useHero();

    return (
        <section id={`hero`} className={`hero`} aria-labelledby={`hero-title`}>
            <div id={`hero-content`} className={`hero-content page-container`}>
                <div id={`hero-copy`} className={`hero-copy`}>
                    <div id={`hero-eyebrow`} className={`hero-eyebrow`}>
                        <Icon id={`hero-eyebrow-icon`} name={`compass`} size={15} />
                        {`A SMALL DIRECTORY. A WORLD OF POSSIBILITIES.`}
                    </div>
                    <h1 id={`hero-title`} className={`hero-title`}>
                        {`One tool to`}<br id={`hero-title-break`} className={`hero-title-break`} />
                        {`rule them `}<span id={`hero-title-accent`} className={`hero-title-accent`}>{`all.`}</span>
                    </h1>
                    <p id={`hero-description`} className={`hero-description`}>
                        {`The right tool makes all the difference. Discover useful websites, extensions, and apps for whatever’s on your to-do list.`}
                    </p>
                    <form
                        role={`search`}
                        id={`hero-search`}
                        className={`hero-search`}
                        onSubmit={(event) => { event.preventDefault(); searchTools(); }}
                    >
                        <Icon id={`hero-search-icon`} name={`search`} size={21} />
                        <label id={`hero-search-label`} className={`hero-search-label`} htmlFor={`hero-search-input`}>
                            {`Search the tool directory`}
                        </label>
                        <input
                            type={`search`}
                            value={query}
                            ref={searchRef}
                            autoComplete={`off`}
                            id={`hero-search-input`}
                            className={`hero-search-input`}
                            placeholder={`What do you need a tool for?`}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <kbd id={`hero-search-shortcut`} className={`hero-search-shortcut`}>{`/`}</kbd>
                        <button id={`hero-search-submit`} className={`hero-search-submit`} type={`submit`} aria-label={`Find tools`}>
                            <Icon id={`hero-search-submit-icon`} name={`arrow`} size={20} />
                        </button>
                    </form>
                    <div id={`hero-popular`} className={`hero-popular`}>
                        <span id={`hero-popular-label`} className={`hero-popular-label`}>{`Try searching:`}</span>
                        {popularSearches.map((item) => (
                            <button
                                key={item.id}
                                type={`button`}
                                id={`hero-popular-${item.id}`}
                                className={`hero-popular-search`}
                                onClick={() => searchTools(item.query)}
                            >
                                <Icon id={`hero-popular-${item.id}-icon`} name={`search`} size={12} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div id={`hero-platforms`} className={`hero-platforms`}>
                        <span id={`hero-platform-web`} className={`hero-platform`}>
                            <Icon id={`hero-platform-web-icon`} name={`globe`} size={15} />{`Websites`}
                        </span>
                        <span id={`hero-platform-extension`} className={`hero-platform`}>
                            <Icon id={`hero-platform-extension-icon`} name={`puzzle`} size={15} />{`Extensions`}
                        </span>
                        <span id={`hero-platform-app`} className={`hero-platform`}>
                            <Icon id={`hero-platform-app-icon`} name={`phone`} size={15} />{`Mobile apps`}
                        </span>
                    </div>
                </div>
                <Showcase />
            </div>
            <div id={`hero-bottom`} className={`hero-bottom page-container`}>
                <span id={`hero-bottom-note`} className={`hero-bottom-note`}>
                    <Icon id={`hero-bottom-note-icon`} name={`check`} size={16} />
                    {`Less searching. More doing.`}
                </span>
                <span id={`hero-bottom-count`} className={`hero-bottom-count`}>
                    {`${tools.length} useful tools · ${categories.length} categories · One place`}
                </span>
            </div>
        </section>
    );
}
