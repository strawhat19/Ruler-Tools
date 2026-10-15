export const routeRegistry = {
    home: { path: `/`, label: `Explore`, group: `public`, icon: `ruler` },
    about: { path: `/about`, label: `About`, group: `public`, icon: `info` },
    terms: { path: `/terms`, label: `Terms`, group: `public`, icon: `terms` },
    privacy: { path: `/privacy-policy`, label: `Privacy Policy`, group: `public`, icon: `shield` },
    contact: { path: `/contact`, label: `Contact`, group: `public`, icon: `info` },
    help: { path: `/help`, label: `Help`, group: `public`, icon: `info` },
    signin: { path: `/signin`, label: `Sign In`, group: `auth`, icon: `log-in` },
    signup: { path: `/signup`, label: `Sign Up`, group: `auth`, icon: `user-plus` },
    reset: { path: `/reset-password`, label: `Reset Password`, group: `auth`, icon: `shield` },
    profile: { path: `/profile`, label: `Profile`, group: `account`, icon: `user-plus` },
    connections: { path: `/connections`, label: `Connections`, group: `account`, icon: `globe` },
    saved: { path: `/saved`, label: `Saved Tools`, group: `account`, icon: `bookmark` },
    toolkits: { path: `/toolkits`, label: `Toolkits`, group: `account`, icon: `ruler` },
    dashboard: { path: `/dashboard`, label: `Dashboard`, group: `admin`, icon: `gauge` },
    analytics: { path: `/analytics`, label: `Analytics`, group: `admin`, icon: `gauge` },
    users: { path: `/users`, label: `Users`, group: `admin`, icon: `user-plus` },
    catalog: { path: `/catalog`, label: `Catalog`, group: `admin`, icon: `ruler` },
    features: { path: `/features`, label: `Features`, group: `admin`, icon: `filters` },
    feedback: { path: `/feedback`, label: `Feedback`, group: `admin`, icon: `terms` },
    notFound: { path: `/404`, label: `Page Not Found`, group: `public`, icon: `info` },
} as const;

export type PageId = keyof typeof routeRegistry;
export const pagePaths = Object.fromEntries(Object.entries(routeRegistry).map(([key, value]) => [key, value.path])) as Record<PageId, string>;
export const routeAliases: Record<string, PageId> = {
    tos: `terms`, privacy: `privacy`, aboutus: `about`, account: `profile`, login: `signin`, register: `signup`,
    'about-us': `about`, 'contact-us': `contact`, 'sign-in': `signin`, 'sign-up': `signup`,
    privacypolicy: `privacy`, privacy_policy: `privacy`, 'terms-of-use': `terms`,
    'privacy-notice': `privacy`, 'terms-of-service': `terms`, 'terms-and-conditions': `terms`,
};
export const workspacePages = (Object.keys(routeRegistry) as PageId[]).filter(page => [`auth`, `account`, `admin`].includes(routeRegistry[page].group));
export const resolvePagePath = (pathname: string): { page: PageId; basePath: string } => {
    const path = pathname.replace(/\/{2,}/g, `/`).replace(/\/+$/, ``) || `/`;
    if (path === `/index.html`) return { page: `home`, basePath: `` };
    const page = (Object.keys(routeRegistry) as PageId[]).find(key => pagePaths[key] === path)
        ?? routeAliases[path.slice(1).toLowerCase()] ?? `notFound`;
    return { page, basePath: `` };
};
