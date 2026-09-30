import { useDirectory } from '../../shared/DirectoryContext';
import type { Tool } from '../../shared/types';

export function useToolCard(tool: Tool) {
    const { savedIds, toggleSaved } = useDirectory();
    const saved = savedIds.includes(tool.id);
    const linkLabel = tool.platform === `app` ? `View app` : tool.platform === `extension` ? `View extension` : `Open website`;
    const platformIcon = tool.platform === `app` ? `phone` : tool.platform === `extension` ? `puzzle` : `globe`;

    return { saved, linkLabel, platformIcon, toggleSaved: () => toggleSaved(tool.id) };
}
