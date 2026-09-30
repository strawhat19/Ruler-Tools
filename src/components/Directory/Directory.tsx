import './Directory.scss';
import Icon from '../Icon/Icon';
import ToolCard from '../ToolCard/ToolCard';
import { tools, categories } from '../../shared/catalog';
import { platformFilters, useDirectoryView } from './Directory.logic';

export default function Directory() {
    const {
        query, setQuery, category, setCategory, platform, setPlatform,
        savedOnly, setSavedOnly, savedCount, sort, setSort, filteredTools,
        resetFilters, visibleCount, showAll,
    } = useDirectoryView();
    const visibleTools = filteredTools.slice(0, visibleCount);

    return (
        <section id={`directory-section`} className={`directory-section page-container`}>
            <div id={`categories`} className={`categories-section`} aria-labelledby={`categories-title`}>
                <div id={`categories-heading`} className={`categories-heading`}>
                    <h2 id={`categories-title`} className={`categories-title`}>{`A tool for every little thing.`}</h2>
                    <button
                        type={`button`}
                        aria-pressed={category === `all`}
                        id={`categories-view-all`}
                        className={`categories-view-all`}
                        onClick={() => setCategory(`all`)}
                    >
                        {`All categories`}
                        <Icon id={`categories-view-all-icon`} name={`arrow`} size={14} />
                    </button>
                </div>
                <div id={`category-grid`} className={`category-grid`}>
                    {categories.map((item) => (
                        <button
                            key={item.id}
                            type={`button`}
                            id={`category-${item.id}`}
                            className={`category-card ${category === item.id ? `is-active` : ``}`}
                            aria-pressed={category === item.id}
                            onClick={() => setCategory(category === item.id ? `all` : item.id)}
                        >
                            <Icon id={`category-icon-${item.id}`} name={item.icon} size={25} />
                            <span id={`category-name-${item.id}`} className={`category-name`}>{item.name}</span>
                            <span id={`category-count-${item.id}`} className={`category-count`}>
                                {`${tools.filter((tool) => tool.category === item.id).length} ${tools.filter((tool) => tool.category === item.id).length === 1 ? `tool` : `tools`}`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div id={`directory`} className={`directory-main`}>
                <div id={`directory-heading`} className={`directory-heading`}>
                    <div id={`directory-heading-copy`} className={`directory-heading-copy`}>
                        <p id={`directory-eyebrow`} className={`section-eyebrow`}>{`THE GOOD STUFF, ALL IN ONE PLACE`}</p>
                        <h2 id={`directory-title`} className={`directory-title`}>{savedOnly ? `Your personal toolkit.` : `Find your next go-to.`}</h2>
                        <p id={`directory-subtitle`} className={`directory-subtitle`}>
                            {savedOnly ? `Your saved tools, ready for the next task.` : `Small tools that make a big difference to your day.`}
                        </p>
                    </div>
                    <div id={`directory-sort-wrap`} className={`directory-sort-wrap`}>
                        <label id={`directory-sort-label`} className={`directory-sort-label`} htmlFor={`directory-sort`}>{`Sort by`}</label>
                        <select
                            value={sort}
                            id={`directory-sort`}
                            className={`directory-sort`}
                            onChange={(event) => setSort(event.target.value as `featured` | `name`)}
                        >
                            <option id={`directory-sort-featured`} className={`directory-sort-option`} value={`featured`}>{`Featured first`}</option>
                            <option id={`directory-sort-name`} className={`directory-sort-option`} value={`name`}>{`Name: A–Z`}</option>
                        </select>
                        <Icon id={`directory-sort-icon`} name={`chevron`} size={14} />
                    </div>
                </div>
                <div id={`directory-toolbar`} className={`directory-toolbar`}>
                    <div id={`directory-platforms`} className={`directory-platforms`} role={`group`} aria-label={`Filter by platform`}>
                        {platformFilters.map((filter) => (
                            <button
                                key={filter.id}
                                type={`button`}
                                id={`platform-filter-${filter.id}`}
                                aria-pressed={platform === filter.id}
                                className={`platform-filter ${platform === filter.id ? `is-active` : ``}`}
                                onClick={() => setPlatform(filter.id)}
                            >
                                <Icon id={`platform-filter-icon-${filter.id}`} name={filter.icon} size={16} />
                                {filter.name}
                                {filter.id === `all` && (
                                    <span id={`platform-all-count`} className={`platform-all-count`}>{tools.length}</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <button
                        type={`button`}
                        id={`directory-saved-filter`}
                        aria-pressed={savedOnly}
                        className={`directory-saved-filter ${savedOnly ? `is-active` : ``}`}
                        onClick={() => setSavedOnly(!savedOnly)}
                    >
                        <Icon id={`directory-saved-filter-icon`} name={`bookmark`} size={16} />
                        {`Saved${savedCount ? ` (${savedCount})` : ``}`}
                    </button>
                </div>
                <div id={`directory-results-bar`} className={`directory-results-bar`}>
                    <p id={`directory-results-count`} className={`directory-results-count`} role={`status`} aria-live={`polite`}>
                        {`${filteredTools.length} ${filteredTools.length === 1 ? `tool` : `tools`}${category !== `all` ? ` in ${categories.find((item) => item.id === category)?.name}` : ` to make life a little easier`}`}
                    </p>
                    <div id={`directory-search-wrap`} className={`directory-search-wrap`}>
                        <Icon id={`directory-search-icon`} name={`search`} size={15} />
                        <input
                            type={`search`}
                            value={query}
                            autoComplete={`off`}
                            aria-label={`Search tools`}
                            id={`directory-search-input`}
                            className={`directory-search-input`}
                            placeholder={`Search tools...`}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                </div>
                {visibleTools.length > 0 ? (
                    <div id={`tool-grid`} className={`tool-grid`}>
                        {visibleTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
                    </div>
                ) : (
                    <div id={`directory-empty`} className={`directory-empty`}>
                        <span id={`directory-empty-icon-wrap`} className={`directory-empty-icon-wrap`}>
                            <Icon id={`directory-empty-icon`} name={savedOnly ? `bookmark` : `search`} size={30} />
                        </span>
                        <h3 id={`directory-empty-title`} className={`directory-empty-title`}>
                            {savedOnly && savedCount === 0 ? `Your toolkit starts here.` : `No tools found just yet.`}
                        </h3>
                        <p id={`directory-empty-description`} className={`directory-empty-description`}>
                            {savedOnly && savedCount === 0 ? `Tap the bookmark on any tool to keep it close at hand.` : `Try a different search or clear your filters to see more tools.`}
                        </p>
                        <button id={`directory-empty-reset`} className={`directory-empty-reset`} type={`button`} onClick={resetFilters}>
                            <Icon id={`directory-empty-reset-icon`} name={`compass`} size={17} />
                            {`Explore all tools`}
                        </button>
                    </div>
                )}
                {filteredTools.length > visibleCount && (
                    <div id={`directory-show-more-wrap`} className={`directory-show-more-wrap`}>
                        <button id={`directory-show-more`} className={`directory-show-more`} type={`button`} onClick={showAll}>
                            {`Show all ${filteredTools.length} tools`}
                            <Icon id={`directory-show-more-icon`} name={`chevron`} size={17} />
                        </button>
                        <span id={`directory-visible-count`} className={`directory-visible-count`}>{`Showing ${visibleTools.length} of ${filteredTools.length}`}</span>
                    </div>
                )}
                <p id={`directory-note`} className={`directory-note`}>
                    <Icon id={`directory-note-icon`} name={`external`} size={13} />
                    {`Tools open on their official websites or app stores. Some may require a purchase or an account.`}
                </p>
            </div>
        </section>
    );
}
