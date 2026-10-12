import type { PageId } from '../../shared/routes';
import { useRef, useEffect, useState } from 'react';

interface ScrollSection {
    id: string;
    label: string;
}

const homeSections: ScrollSection[] = [
    { id: `hero`, label: `Ruler Tools` },
    { id: `categories`, label: `Categories` },
    { id: `directory`, label: `Tools` },
    { id: `footer-philosophy`, label: `Our Philosophy` },
    { id: `footer-copyright`, label: `Copyright` },
];
const pageLabels = { about: `About`, terms: `Terms`, privacy: `Privacy Policy` };
const informationSections = Object.fromEntries(Object.entries(pageLabels).map(([page, label]) => [page, [
    { id: `ruler-tools-main`, label },
    { id: `footer-philosophy`, label: `Our Philosophy` },
    { id: `footer-copyright`, label: `Copyright` },
]])) as Record<Exclude<PageId, `home`>, ScrollSection[]>;

export const rulerTicks = Array.from({ length: 101 }, (_, index) => index);
export const rulerDigits = Array.from({ length: 10 }, (_, index) => index);
export const pageRulerSectionsEnabled = false;
export const getScrollSections = (page: PageId) => page === `home` ? homeSections : informationSections[page];
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const blend = (start: number, end: number, amount: number) => start + (end - start) * amount;
const easeInOut = (value: number) => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

export const usePageScrollbar = (sections: ScrollSection[]) => {
    const railRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);
    const needleRef = useRef<HTMLDivElement>(null);
    const labelsRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const topPoolRef = useRef<HTMLDivElement>(null);
    const bottomPoolRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const rail = railRef.current;
        const scale = scaleRef.current;
        const ghost = ghostRef.current;
        const needle = needleRef.current;
        const labels = labelsRef.current;
        const viewport = viewportRef.current;
        const topPool = topPoolRef.current;
        const bottomPool = bottomPoolRef.current;
        if (!rail || !scale || !ghost || !needle || !labels || !viewport || !topPool || !bottomPool) return;

        const root = document.documentElement;
        const desktop = window.matchMedia(`(min-width: 1024px) and (hover: hover) and (pointer: fine)`);
        const motion = window.matchMedia(`(prefers-reduced-motion: reduce)`);
        const ticks = Array.from(scale.children) as HTMLElement[];
        const numbers = ticks.map(tick => tick.querySelector<HTMLElement>(`.page-ruler-tick-number`));
        const links = Array.from(labels.children) as HTMLAnchorElement[];
        const letters = links.map(link => Array.from(link.children) as HTMLElement[]);
        const canvas = pageRulerSectionsEnabled ? document.createElement(`canvas`).getContext(`2d`) : null;
        const digits = Array.from(needle.querySelectorAll<HTMLElement>(`.page-ruler-digit-column`));
        let positions: number[] = [];
        let bottoms: number[] = [];
        let widths: number[][] = [];
        let totals: number[] = [];
        let viewportWidth = 0;
        let height = 1, documentHeight = 1, headerHeight = 0, maximum = 0;
        let footerTop = Infinity, marqueeTop = Infinity, marqueeBottom = -Infinity;
        let enabled = false, locked = false, zoom = 0, zoomTarget = 0, velocity = 0;
        let pointerY = 0, pointerInside = false, focused = false, dragging = false;
        let pointerId: number | null = null, dragStart = 0, dragMoved = false;
        let frame = 0, hoverTimer = 0, lastTime = 0, lastScroll = window.scrollY;
        let targetScroll = window.scrollY, expectedScroll: number | null = null;
        let scrollMode: `wheel` | `drag` | `jump` | `snap` | null = null;
        let jumpStart = 0, jumpFrom = 0, jumpDuration = 0;
        let snapSince: number | null = null, snapArmed = true;
        const introStarted = performance.now();
        let needsPaint = true, disposed = false;
        const flashUntil = sections.map(() => 0);

        const base = () => headerHeight + 12;
        const span = () => Math.max(1, height - headerHeight - 24);
        const progress = () => clamp(window.scrollY / Math.max(1, maximum));
        const railColorAt = (screenY: number) => {
            const documentY = screenY + window.scrollY;
            if (documentY >= footerTop) return `#fff`;
            return documentY >= marqueeTop && documentY <= marqueeBottom ? `var(--navy)` : `var(--rail-color)`;
        };
        const releaseDrag = () => {
            dragging = false;
            rail.classList.remove(`is-dragging`);
            if (pointerId !== null && rail.hasPointerCapture(pointerId)) rail.releasePointerCapture(pointerId);
            pointerId = null;
        };
        const stopScroll = () => {
            scrollMode = null;
            snapSince = null;
            expectedScroll = null;
            targetScroll = window.scrollY;
        };
        const writeScroll = (value: number) => {
            expectedScroll = clamp(value, 0, maximum);
            window.scrollTo({ top: expectedScroll, behavior: `instant` });
        };

        const paint = (delta: number) => {
            const scroll = clamp(window.scrollY, 0, maximum);
            const percentage = progress();
            const drift = base() - percentage * (headerHeight + 24);
            const needleY = base() + percentage * span();
            velocity = motion.matches ? 0 : velocity + ((scroll - lastScroll) / delta - velocity) * (1 - Math.exp(-6 * delta));
            lastScroll = scroll;
            rail.setAttribute(`aria-valuenow`, `${Math.round(percentage * 100)}`);
            rail.setAttribute(`aria-valuetext`, `${Math.round(percentage * 100)}% of page`);
            rail.dataset.expanded = zoom > .01 ? `true` : `false`;

            ticks.forEach((tick, index) => {
                const documentY = index / 100 * documentHeight;
                const screenY = blend(documentY - scroll + drift, base() + index / 100 * span(), zoom);
                const proximity = Math.max(0, 1 - Math.abs(documentY - percentage * documentHeight) / 180);
                const stretch = clamp(Math.abs(velocity) / 3000) * proximity ** 2;
                const intro = motion.matches ? 1 : 1 - (1 - clamp((performance.now() - introStarted - index * 10) / 1000)) ** 3;
                tick.style.transform = `translate3d(0, ${screenY}px, 0)`;
                tick.style.color = railColorAt(screenY);
                tick.style.setProperty(`--tick-stretch`, `${(1 + .6 * stretch) * intro}`);
                tick.style.setProperty(`--tick-opacity`, `${Math.min(1, (index % 5 === 0 ? .8 : .4) + .6 * stretch) * intro}`);
            });
            viewport.style.height = `${height / documentHeight * span()}px`;
            viewport.style.color = railColorAt(base() + scroll / documentHeight * span());
            viewport.style.opacity = `${zoom}`;
            viewport.style.transform = `translate3d(0, ${base() + scroll / documentHeight * span()}px, 0)`;
            needle.style.opacity = `${clamp(percentage / .03)}`;
            needle.style.transform = `translate3d(0, ${needleY}px, 0)`;
            const readout = needle.firstElementChild as HTMLElement | null;
            if (readout) {
                readout.style.top = needleY > height - 26 ? `-14px` : `4px`;
                const documentY = needleY + scroll;
                readout.style.color = documentY >= footerTop ? `var(--rail-accent)`
                    : documentY >= marqueeTop && documentY <= marqueeBottom ? `var(--navy)` : `var(--rail-accent-ink)`;
            }
            `${Math.round(percentage * 100)}`.padStart(3, `0`).split(``).forEach((digit, index) => {
                digits[index]?.style.setProperty(`transform`, `translateY(-${digit}em)`);
            });
            ghost.style.opacity = pointerInside || dragging ? `${.2 + .8 * zoom}` : `0`;
            ghost.style.transform = `translate3d(0, ${clamp(pointerY, base(), base() + span())}px, 0)`;
            ghost.style.backgroundColor = railColorAt(clamp(pointerY, base(), base() + span()));

            if (!pageRulerSectionsEnabled) return;
            if (motion.matches) {
                const current = maximum - scroll < 1 ? sections.length - 1 : positions.reduce((active, position, index) => position <= scroll + headerHeight + 28 ? index : active, 0);
                links.forEach((link, index) => {
                    link.style.pointerEvents = `auto`;
                    link.classList.remove(`is-jumping`);
                    if (index === current) link.setAttribute(`aria-current`, `location`);
                    else link.removeAttribute(`aria-current`);
                });
                return;
            }
            const mapZoom = easeInOut(zoom);
            const sectionMotion = positions.map((position, index) => {
                const ridingY = position - scroll + drift;
                let flip = index === 0 ? 1 : clamp((height * .12 + 200 - ridingY) / 200);
                if (position - maximum > height * .12) {
                    const endStart = Math.min(bottoms[index] - height, maximum - 24);
                    flip = Math.max(flip, clamp((scroll - endStart) / Math.max(24, maximum - endStart)));
                }
                return { ridingY, flip, detach: index === 0 ? 1 : 0, queueY: height - 36 };
            });
            let queueCount = 0;
            for (let index = sectionMotion.length - 1; index > 0; index--) {
                const state = sectionMotion[index];
                state.queueY = height - 36 - 20 * queueCount;
                state.detach = clamp((state.queueY + 240 - (state.ridingY + totals[index] * 20)) / 240);
                queueCount += 1 - state.detach;
            }
            const completed = sectionMotion.filter(state => state.flip >= 1).length;
            const partial = sectionMotion.reduce((sum, state) => sum + (state.flip > 0 && state.flip < 1 ? state.flip : 0), 0);
            const occupancy: { top: number; bottom: number; strength: number }[] = [];
            links.forEach((link, index) => {
                const state = sectionMotion[index];
                const total = totals[index];
                const active = index === completed - 1;
                const pileProgress = active ? clamp(partial) : 1;
                const topY = headerHeight + 28 + index * 20 + 26 * (1 - pileProgress);
                const mapY = base() + (index === 0 ? 0 : positions[index]) / documentHeight * span();
                const horizontal = (offset: number, size: number, y: number, alpha: number) => ({
                    y, alpha, rotation: 0, size,
                    x: viewportWidth - 60 - (total - offset) * size,
                });
                const riding = (offset: number, y: number) => ({
                    x: viewportWidth - 30, y: y + (total - offset) * 20,
                    rotation: -90, size: 20, alpha: .35,
                });
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, offset = 0;
                const frames = letters[index].map((letter, letterIndex) => {
                    const width = widths[index][letterIndex];
                    const center = offset + width / 2;
                    offset += width;
                    let start, finish, amount;
                    if (state.flip > 0) {
                        amount = state.flip;
                        start = riding(center, state.ridingY);
                        finish = state.flip >= 1
                            ? horizontal(center, blend(34, 16, pileProgress), topY, blend(1, .35, pileProgress))
                            : horizontal(center, 34, headerHeight + 28 + index * 20 + 26, 1);
                    } else {
                        amount = state.detach;
                        start = horizontal(center, 16, state.queueY, .35);
                        finish = riding(center, state.detach < 1 ? state.queueY - total * 20 : state.ridingY);
                    }
                    const stagger = letters[index].length - 1 - letterIndex;
                    const travel = easeInOut(clamp(amount * (1 + (letters[index].length - 1) * .16) - stagger * .16));
                    const inverse = 1 - travel;
                    const arcX = (start.x + finish.x) / 2 - 28;
                    let x = inverse ** 2 * start.x + 2 * inverse * travel * arcX + travel ** 2 * finish.x;
                    let y = blend(start.y, finish.y, travel);
                    let size = blend(start.size, finish.size, travel);
                    let rotation = blend(start.rotation, finish.rotation, travel);
                    let alpha = blend(start.alpha, finish.alpha, travel);
                    const mapped = horizontal(center, 16, mapY, .85);
                    x = blend(x, mapped.x, mapZoom);
                    y = blend(y, mapped.y, mapZoom);
                    size = blend(size, mapped.size, mapZoom);
                    rotation *= 1 - mapZoom;
                    alpha = blend(alpha, mapped.alpha, mapZoom);
                    if (index === 0 && sections[index].id === `hero`) alpha *= blend(clamp(scroll / 180), 1, mapZoom);
                    const halfWidth = (Math.abs(rotation) > 45 ? size : width * size) / 2 + 2;
                    const halfHeight = (Math.abs(rotation) > 45 ? width * size : size) / 2 + 2;
                    minX = Math.min(minX, x - halfWidth);
                    maxX = Math.max(maxX, x + halfWidth);
                    minY = Math.min(minY, y - halfHeight);
                    maxY = Math.max(maxY, y + halfHeight);
                    return { letter, x, y, size, rotation, alpha };
                });
                link.style.left = `${minX}px`;
                link.style.top = `${minY}px`;
                link.style.width = `${maxX - minX}px`;
                link.style.height = `${maxY - minY}px`;
                link.style.pointerEvents = frames.some(item => item.alpha > .05) ? `auto` : `none`;
                link.classList.toggle(`is-current`, active);
                link.classList.toggle(`is-jumping`, flashUntil[index] > performance.now());
                if (active) link.setAttribute(`aria-current`, `location`);
                else link.removeAttribute(`aria-current`);
                frames.forEach(({ letter, x, y, size, rotation, alpha }) => {
                    letter.style.opacity = `${alpha}`;
                    letter.style.transform = `translate3d(${x - minX}px, ${y - minY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${size / 34})`;
                });
                if (index > 0 && state.detach * (1 - state.flip) > .02) occupancy.push({
                    top: state.ridingY, bottom: state.ridingY + total * 20, strength: state.detach * (1 - state.flip),
                });
            });
            numbers.forEach((number, index) => {
                if (!number) return;
                const y = blend(index / 100 * documentHeight - scroll + drift, base() + index / 100 * span(), zoom);
                let alpha = 1;
                occupancy.forEach(item => {
                    const distance = y < item.top ? item.top - y : y > item.bottom ? y - item.bottom : 0;
                    if (distance < 24) alpha = Math.min(alpha, 1 - item.strength * (1 - distance / 24));
                });
                number.style.opacity = `${.5 * blend(alpha, 1, zoom)}`;
            });
            topPool.style.opacity = `${Math.max(...sectionMotion.map(state => state.flip))}`;
            bottomPool.style.opacity = `${Math.max(0, ...sectionMotion.slice(1).map(state => 1 - state.detach))}`;
            const halfway = sectionMotion.findIndex((state, index) => index > 0 && state.flip > .04 && state.flip < .96);
            const editing = document.activeElement?.matches(`input, textarea, select, [contenteditable]:not([contenteditable="false"])`);
            if (halfway >= 0 && enabled && snapArmed && !scrollMode && !dragging && !editing && zoom < .3 && Math.abs(velocity) < 30) {
                const time = performance.now();
                if (snapSince === null) snapSince = time;
                else if (time - snapSince >= 400) {
                    const complete = sectionMotion[halfway].flip >= .5;
                    const threshold = height * .12;
                    const desired = threshold + (complete ? -4 : 204);
                    let destination = (positions[halfway] + base() - desired) / (1 + (headerHeight + 24) / Math.max(1, maximum));
                    if (positions[halfway] - maximum > threshold) {
                        destination = complete ? maximum : Math.min(bottoms[halfway] - height, maximum - 24);
                    }
                    targetScroll = clamp(destination, 0, maximum);
                    jumpFrom = window.scrollY;
                    jumpStart = time;
                    jumpDuration = 700;
                    scrollMode = `snap`;
                    snapSince = null;
                    snapArmed = false;
                }
            } else snapSince = null;
        };

        const animate = (time: number) => {
            frame = 0;
            const delta = Math.min(.05, Math.max(.001, (time - (lastTime || time - 16.67)) / 1000));
            lastTime = time;
            zoom = motion.matches ? zoomTarget : blend(zoom, zoomTarget, 1 - Math.exp(-10 * delta));
            if (Math.abs(zoom - zoomTarget) < .001) zoom = zoomTarget;
            if (enabled && !locked && scrollMode) {
                if (scrollMode === `jump` || scrollMode === `snap`) {
                    const elapsed = clamp((time - jumpStart) / jumpDuration);
                    const easing = scrollMode === `snap` ? easeInOut(elapsed) : elapsed === 1 ? 1 : 1 - 2 ** (-10 * elapsed);
                    writeScroll(blend(jumpFrom, targetScroll, easing));
                    if (elapsed === 1) stopScroll();
                } else {
                    const next = blend(window.scrollY, targetScroll, 1 - (1 - (scrollMode === `drag` ? .18 : .12)) ** (delta * 60));
                    writeScroll(Math.abs(next - targetScroll) < .5 ? targetScroll : next);
                    if (Math.abs(window.scrollY - targetScroll) < .5) stopScroll();
                }
            }
            if (needsPaint || enabled) paint(delta);
            needsPaint = false;
            if (enabled && (scrollMode || dragging || snapSince !== null || zoom !== zoomTarget || Math.abs(velocity) > 1 || flashUntil.some(until => until > time) || !motion.matches && time - introStarted < 2000)) requestFrame();
            else lastTime = 0;
        };
        const requestFrame = () => {
            needsPaint = true;
            if (!frame) frame = window.requestAnimationFrame(animate);
        };
        const measure = () => {
            height = window.innerHeight;
            viewportWidth = window.innerWidth;
            documentHeight = Math.max(height, root.scrollHeight, document.body.scrollHeight);
            headerHeight = document.getElementById(`site-header`)?.getBoundingClientRect().height ?? 0;
            const footer = document.getElementById(`site-footer`)?.getBoundingClientRect();
            const marquee = document.getElementById(`featured-ruler-marquee`)?.getBoundingClientRect();
            footerTop = footer ? footer.top + window.scrollY : Infinity;
            marqueeTop = marquee ? marquee.top + window.scrollY : Infinity;
            marqueeBottom = marquee ? marquee.bottom + window.scrollY : -Infinity;
            maximum = Math.max(0, documentHeight - height);
            locked = [document.body, root].some(element => [`hidden`, `clip`].includes(window.getComputedStyle(element).overflowY));
            enabled = desktop.matches && maximum > 1 && !locked;
            if (pageRulerSectionsEnabled) {
                positions = sections.map(section => {
                    const element = document.getElementById(section.id);
                    return element ? element.getBoundingClientRect().top + window.scrollY : 0;
                });
                bottoms = sections.map(section => (document.getElementById(section.id)?.getBoundingClientRect().bottom ?? 0) + window.scrollY);
                widths = letters.map(group => group.map(letter => {
                    const style = window.getComputedStyle(letter);
                    if (canvas) canvas.font = `${style.fontWeight} 34px ${style.fontFamily}`;
                    return (canvas?.measureText(letter.textContent ?? ``).width ?? 20) / 34;
                }));
                totals = widths.map(group => group.reduce((total, width) => total + width, 0));
                const poolWidth = Math.max(260, ...totals.map(total => total * 34)) + 124;
                topPool.style.width = bottomPool.style.width = `${poolWidth}px`;
                topPool.style.height = `${headerHeight + 28 + (sections.length - 1) * 20 + 26 + 34 + 64}px`;
                bottomPool.style.height = `${36 + sections.length * 20 + 64}px`;
            }
            rail.dataset.reducedMotion = motion.matches ? `true` : `false`;
            root.classList.toggle(`has-page-ruler`, enabled);
            setVisible(enabled);
            if (!enabled || motion.matches) {
                releaseDrag();
                stopScroll();
                pointerInside = false;
                zoomTarget = zoom = 0;
                window.clearTimeout(hoverTimer);
            }
            targetScroll = clamp(targetScroll, 0, maximum);
            requestFrame();
        };
        const setHover = (active: boolean) => {
            window.clearTimeout(hoverTimer);
            if (!enabled || motion.matches) return;
            hoverTimer = window.setTimeout(() => {
                zoomTarget = active ? 1 : 0;
                requestFrame();
            }, 150);
            requestFrame();
        };
        const pointerTarget = (clientY: number) => clamp((clientY - base()) / span()) * maximum;
        const jumpTo = (target: number, duration?: number) => {
            if (!enabled || locked) return;
            targetScroll = clamp(target, 0, maximum);
            if (motion.matches) return writeScroll(targetScroll);
            jumpFrom = window.scrollY;
            jumpStart = performance.now();
            jumpDuration = duration ?? 1250 * (.4 + .6 * Math.min(1, Math.abs(targetScroll - jumpFrom) / (2.5 * height)));
            scrollMode = `jump`;
            requestFrame();
        };
        const onPointerEnter = (event: PointerEvent) => {
            pointerInside = true;
            pointerY = event.clientY;
            setHover(true);
        };
        const onPointerLeave = () => {
            pointerInside = false;
            if (!dragging) setHover(focused);
        };
        const onPointerDown = (event: PointerEvent) => {
            if (!enabled || locked || event.button !== 0) return;
            event.preventDefault();
            stopScroll();
            dragging = true;
            snapArmed = true;
            if (!motion.matches) zoomTarget = 1;
            dragMoved = false;
            dragStart = pointerY = event.clientY;
            pointerId = event.pointerId;
            rail.setPointerCapture(event.pointerId);
            rail.classList.add(`is-dragging`);
            requestFrame();
        };
        const onPointerMove = (event: PointerEvent) => {
            pointerY = event.clientY;
            if (dragging && event.pointerId === pointerId) {
                dragMoved ||= Math.abs(pointerY - dragStart) > 4;
                if (dragMoved) {
                    targetScroll = pointerTarget(pointerY);
                    if (motion.matches) writeScroll(targetScroll);
                    else scrollMode = `drag`;
                }
            }
            requestFrame();
        };
        const onPointerUp = (event: PointerEvent) => {
            if (!dragging || event.pointerId !== pointerId) return;
            const moved = dragMoved;
            const target = pointerTarget(event.clientY);
            releaseDrag();
            if (!moved) jumpTo(target);
            else {
                targetScroll = target;
                if (motion.matches) writeScroll(target);
                else scrollMode = `drag`;
                requestFrame();
            }
            if (!pointerInside) setHover(focused);
        };
        const onPointerCancel = () => {
            releaseDrag();
            stopScroll();
            setHover(pointerInside || focused);
        };
        const onLostCapture = () => { if (dragging) onPointerCancel(); };
        const onFocusIn = () => { focused = true; setHover(true); };
        const onFocusOut = () => { focused = false; setHover(pointerInside); };
        const onKeyDown = (event: KeyboardEvent) => {
            stopScroll();
            snapArmed = true;
            if (event.target !== rail || !enabled) return;
            const targets: Record<string, number> = {
                Home: 0,
                End: maximum,
                ArrowUp: window.scrollY - 40,
                PageUp: window.scrollY - height,
                ArrowDown: window.scrollY + 40,
                PageDown: window.scrollY + height,
            };
            if (event.key in targets) {
                event.preventDefault();
                jumpTo(targets[event.key]);
            }
        };
        const onSectionClick = (event: MouseEvent) => {
            const link = (event.target as Element)?.closest<HTMLAnchorElement>(`a[data-section]`);
            if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            const index = sections.findIndex(section => section.id === link.dataset.section);
            if (index < 0) return;
            event.preventDefault();
            flashUntil[index] = performance.now() + 350;
            snapArmed = false;
            jumpTo(index === 0 ? 0 : positions[index] - headerHeight, 1250);
        };
        const onWheel = (event: WheelEvent) => {
            snapArmed = true;
            snapSince = null;
            if (!enabled || locked || motion.matches || event.defaultPrevented || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) { stopScroll(); return; }
            for (const node of event.composedPath()) {
                if (!(node instanceof HTMLElement) || node === document.body || node === root) continue;
                if (node.matches(`input, textarea, select, [contenteditable]:not([contenteditable="false"])`)) { stopScroll(); return; }
                const overflow = window.getComputedStyle(node).overflowY;
                if ([`auto`, `scroll`].includes(overflow) && node.scrollHeight > node.clientHeight && (event.deltaY < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1)) { stopScroll(); return; }
            }
            const distance = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
            if (!distance) return;
            if (!event.cancelable) { stopScroll(); return; }
            event.preventDefault();
            targetScroll = clamp((scrollMode === `wheel` ? targetScroll : window.scrollY) + distance, 0, maximum);
            scrollMode = `wheel`;
            requestFrame();
        };
        const onScroll = () => {
            if (expectedScroll !== null && Math.abs(window.scrollY - expectedScroll) > 2) stopScroll();
            requestFrame();
        };
        const onNativeInput = (event: PointerEvent) => {
            snapArmed = true;
            if (!rail.contains(event.target as Node)) stopScroll();
        };
        const onWindowBlur = () => {
            snapArmed = false;
            pointerInside = focused = false;
            onPointerCancel();
        };

        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(document.body);
        const header = document.getElementById(`site-header`);
        if (header) resizeObserver.observe(header);
        const lockObserver = new MutationObserver(measure);
        lockObserver.observe(document.body, { attributes: true, attributeFilter: [`style`, `class`] });
        lockObserver.observe(root, { attributes: true, attributeFilter: [`style`] });
        rail.addEventListener(`pointerup`, onPointerUp);
        rail.addEventListener(`pointermove`, onPointerMove);
        rail.addEventListener(`pointerdown`, onPointerDown);
        rail.addEventListener(`pointerenter`, onPointerEnter);
        rail.addEventListener(`pointerleave`, onPointerLeave);
        rail.addEventListener(`pointercancel`, onPointerCancel);
        rail.addEventListener(`lostpointercapture`, onLostCapture);
        rail.addEventListener(`focusin`, onFocusIn);
        rail.addEventListener(`focusout`, onFocusOut);
        labels.addEventListener(`click`, onSectionClick);
        window.addEventListener(`blur`, onWindowBlur);
        window.addEventListener(`resize`, measure);
        window.addEventListener(`keydown`, onKeyDown);
        window.addEventListener(`scroll`, onScroll, { passive: true });
        window.addEventListener(`pointerdown`, onNativeInput, { passive: true });
        window.addEventListener(`touchstart`, stopScroll, { passive: true });
        window.addEventListener(`wheel`, onWheel, { passive: false });
        desktop.addEventListener(`change`, measure);
        motion.addEventListener(`change`, measure);
        measure();
        document.fonts?.ready.then(() => { if (!disposed) measure(); }).catch(() => {});

        return () => {
            disposed = true;
            resizeObserver.disconnect();
            lockObserver.disconnect();
            window.clearTimeout(hoverTimer);
            releaseDrag();
            window.cancelAnimationFrame(frame);
            root.classList.remove(`has-page-ruler`);
            rail.removeEventListener(`pointerup`, onPointerUp);
            rail.removeEventListener(`pointermove`, onPointerMove);
            rail.removeEventListener(`pointerdown`, onPointerDown);
            rail.removeEventListener(`pointerenter`, onPointerEnter);
            rail.removeEventListener(`pointerleave`, onPointerLeave);
            rail.removeEventListener(`pointercancel`, onPointerCancel);
            rail.removeEventListener(`lostpointercapture`, onLostCapture);
            rail.removeEventListener(`focusin`, onFocusIn);
            rail.removeEventListener(`focusout`, onFocusOut);
            labels.removeEventListener(`click`, onSectionClick);
            window.removeEventListener(`blur`, onWindowBlur);
            window.removeEventListener(`resize`, measure);
            window.removeEventListener(`keydown`, onKeyDown);
            window.removeEventListener(`scroll`, onScroll);
            window.removeEventListener(`pointerdown`, onNativeInput);
            window.removeEventListener(`touchstart`, stopScroll);
            window.removeEventListener(`wheel`, onWheel);
            desktop.removeEventListener(`change`, measure);
            motion.removeEventListener(`change`, measure);
        };
    }, [sections]);

    return { visible, railRef, scaleRef, ghostRef, needleRef, labelsRef, topPoolRef, viewportRef, bottomPoolRef };
};
