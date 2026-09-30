import { Platform } from 'react-native';
import type { PageId } from './routes';
import type { ReactNode, MouseEvent } from 'react';
import { pagePaths, resolvePagePath } from './routes';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type { PageId } from './routes';

interface NavigationRoute {
    page: PageId;
    anchor?: string;
    basePath: string;
}

interface NavigationState {
    page: PageId;
    pageHref: (page: PageId) => string;
    navigate: (page: PageId, anchor?: string) => void;
    linkTo: (page: PageId, anchor?: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
}

const NavigationContext = createContext<NavigationState | undefined>(undefined);

function readRoute(): NavigationRoute {
    return Platform.OS === `web` && typeof window !== `undefined`
        ? resolvePagePath(window.location.pathname)
        : { page: `home`, basePath: `` };
}

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [route, setRoute] = useState<NavigationRoute>(readRoute);
    const { page, anchor, basePath } = route;

    const pageHref = useCallback((nextPage: PageId) => (
        `${basePath}${pagePaths[nextPage]}`
    ), [basePath]);

    const navigate = useCallback((nextPage: PageId, nextAnchor?: string) => {
        if (Platform.OS === `web` && typeof window !== `undefined`) {
            const path = pageHref(nextPage);

            if (window.location.pathname !== path || window.location.hash) {
                window.history.pushState(window.history.state, ``, `${path}${window.location.search}`);
            }
        }

        setRoute({ page: nextPage, anchor: nextAnchor, basePath });
    }, [basePath, pageHref]);

    const linkTo = useCallback((nextPage: PageId, nextAnchor?: string) => (
        (event: MouseEvent<HTMLAnchorElement>) => {
            if (
                event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey
                || event.shiftKey || event.altKey || event.currentTarget.hasAttribute(`download`)
                || (event.currentTarget.target && event.currentTarget.target !== `_self`)
            ) return;

            event.preventDefault();
            navigate(nextPage, nextAnchor);
        }
    ), [navigate]);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof window === `undefined`) return;

        function syncRoute() {
            const nextRoute = readRoute();
            const path = `${nextRoute.basePath}${pagePaths[nextRoute.page]}`;

            if (window.location.pathname !== path || window.location.hash) {
                window.history.replaceState(window.history.state, ``, `${path}${window.location.search}`);
            }

            setRoute(nextRoute);
        }

        window.addEventListener(`popstate`, syncRoute);
        syncRoute();

        return () => window.removeEventListener(`popstate`, syncRoute);
    }, []);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof window === `undefined`) return;

        const titles: Record<PageId, string> = {
            home: `Ruler Tools — One Tool to Rule Them All`,
            about: `About | Ruler Tools`,
            terms: `Terms | Ruler Tools`,
            privacy: `Privacy Policy | Ruler Tools`,
        };
        const targetId = anchor || (page === `home` ? `hero` : `ruler-tools-main`);

        document.title = titles[page];

        const frame = window.requestAnimationFrame(() => {
            const target = document.getElementById(targetId);
            const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

            target?.scrollIntoView({ behavior: reducedMotion ? `auto` : `smooth` });

            if (page !== `home`) target?.focus({ preventScroll: true });
        });

        return () => window.cancelAnimationFrame(frame);
    }, [route, page, anchor]);

    return (
        <NavigationContext.Provider value={{ page, navigate, pageHref, linkTo }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);

    if (!context) throw new Error(`useNavigation must be used inside NavigationProvider.`);

    return context;
}
