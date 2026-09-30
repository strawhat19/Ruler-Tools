export type Platform = `all` | `website` | `extension` | `app`;
export type Category = `all` | `calculators` | `measuring` | `leveling` | `converters` | `design` | `developer`;
export type ToolIcon = `calculator` | `ruler` | `scan` | `gauge` | `compass` | `convert` | `palette` | `pipette` | `type` | `code`;

export interface Tool {
    id: string;
    name: string;
    url: string;
    icon: ToolIcon;
    color: string;
    description: string;
    category: Category;
    platform: Exclude<Platform, `all`>;
    platformLabel: string;
    featured?: boolean;
    tags: string[];
}

export interface ToolCategory {
    id: Category;
    name: string;
    icon: ToolIcon;
    description: string;
}
