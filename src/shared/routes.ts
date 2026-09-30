export type PageId = `home` | `about` | `terms` | `privacy`;

export const pagePaths: Record<PageId, string> = {
    home: `/`,
    about: `/about`,
    terms: `/terms`,
    privacy: `/privacy-policy`,
};

export const routeAliases: Record<string, PageId> = {
    tos: `terms`,
    privacy: `privacy`,
    aboutus: `about`,
    'about-us': `about`,
    privacypolicy: `privacy`,
    privacy_policy: `privacy`,
    'terms-of-use': `terms`,
    'privacy-notice': `privacy`,
    'terms-of-service': `terms`,
    'terms-and-conditions': `terms`,
};

const routePages: Record<string, PageId> = {
    ...routeAliases,
    about: `about`,
    terms: `terms`,
    'privacy-policy': `privacy`,
};

export function resolvePagePath(pathname: string) {
    const path = pathname.replace(/\/{2,}/g, `/`).replace(/\/+$/, ``);
    const lastSlash = path.lastIndexOf(`/`);
    const slug = path.slice(lastSlash + 1).toLowerCase();
    const knownPage = Object.prototype.hasOwnProperty.call(routePages, slug);
    const page: PageId = knownPage ? routePages[slug] : `home`;
    const basePath = knownPage || slug === `index.html` ? path.slice(0, lastSlash) : path;

    return { page, basePath };
}
