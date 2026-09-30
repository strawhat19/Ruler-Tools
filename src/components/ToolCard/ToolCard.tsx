import './ToolCard.scss';
import Icon from '../Icon/Icon';
import type { Tool } from '../../shared/types';
import { categories } from '../../shared/catalog';
import { useToolCard } from './ToolCard.logic';

export default function ToolCard({ tool }: { tool: Tool }) {
    const { saved, linkLabel, platformIcon, toggleSaved } = useToolCard(tool);
    const categoryName = categories.find((category) => category.id === tool.category)?.name;

    return (
        <article id={`tool-card-${tool.id}`} className={`tool-card`} aria-labelledby={`tool-title-${tool.id}`}>
            <div id={`tool-card-top-${tool.id}`} className={`tool-card-top`}>
                <div id={`tool-icon-wrap-${tool.id}`} className={`tool-icon-wrap tool-color-${tool.color}`}>
                    <Icon id={`tool-icon-${tool.id}`} name={tool.icon} size={26} />
                </div>
                {tool.featured && (
                    <span id={`tool-featured-${tool.id}`} className={`tool-featured`}>
                        <Icon id={`tool-featured-icon-${tool.id}`} name={`check`} size={12} />
                        {`Featured`}
                    </span>
                )}
                <button
                    type={`button`}
                    aria-pressed={saved}
                    id={`tool-bookmark-${tool.id}`}
                    className={`tool-bookmark ${saved ? `is-saved` : ``}`}
                    onClick={toggleSaved}
                    title={saved ? `Remove from my toolkit` : `Save to my toolkit`}
                    aria-label={`${saved ? `Remove` : `Save`} ${tool.name} ${saved ? `from` : `to`} my toolkit`}
                >
                    <Icon id={`tool-bookmark-icon-${tool.id}`} name={`bookmark`} size={19} />
                </button>
            </div>
            <div id={`tool-copy-${tool.id}`} className={`tool-copy`}>
                <span id={`tool-category-${tool.id}`} className={`tool-category`}>{categoryName}</span>
                <h3 id={`tool-title-${tool.id}`} className={`tool-title`}>{tool.name}</h3>
                <p id={`tool-description-${tool.id}`} className={`tool-description`}>{tool.description}</p>
            </div>
            <div id={`tool-card-bottom-${tool.id}`} className={`tool-card-bottom`}>
                <span id={`tool-platform-${tool.id}`} className={`tool-platform`}>
                    <Icon id={`tool-platform-icon-${tool.id}`} name={platformIcon} size={13} />
                    {tool.platformLabel}
                </span>
                <a
                    href={tool.url}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    id={`tool-launch-${tool.id}`}
                    className={`tool-launch`}
                    aria-label={`${linkLabel}: ${tool.name} (opens in a new tab)`}
                >
                    {linkLabel}
                    <Icon id={`tool-launch-icon-${tool.id}`} name={`external`} size={13} />
                </a>
            </div>
        </article>
    );
}
