# Page Ruler Scrollbar

The web page uses an Artcraft-style document scrollbar, adapted to Ruler Tools' navy, gold, DM Sans and Manrope. `PageScrollbar` owns the rendering, SCSS and scrolling logic; `LandingPage.web.tsx` mounts it once. No new dependency is required.

Section labels and their gradient contrast pools are currently toggled off with `pageRulerSectionsEnabled = false` in `PageScrollbar.logic.ts`. Letter motion and its idle snapping are dormant. The ruler's hover, click, drag and wheel controls remain enabled.

The rail's gradient frost and backdrop blur have been removed. The viewport indicator has an outline without a shaded fill, keeping the page visible beneath the ruler ticks.

## Reference Evidence

Reference: https://getartcraft.com/, inspected October 12, 2026. Browser observations covered the rendered ruler, track clicks, pointer dragging and the resulting hover overview. REA inspected the publicly shipped scrollbar script `29wilaqtb26u5.js`, module `54227`, with mapping helpers in `3t7nt0wd79uuv.js`, module `74268`.

- REA analysis: `ev_bf2da5b6acf99cdf015abe8b841d67a14d389f71713a81887a24566d7e66c087`
- REA summary: `ev_98cea8449983a79a6212c408f2a31a1095282fb1c634caa896231cf3ace132df`
- REA module view: `ev_76d9bd71cf3a39c2283859fe9d7b858400db6878180968d7f6182c394e2b72b8`

The script parsed without errors. Static inventory was complete within the captured script; dynamic semantic relationships remained partial. The interaction constants below come from shipped source, not timing measurements of Ruler Tools.

| Behavior | Reference Values Used |
| --- | --- |
| Rail and ticks | 60px rail, 101 ticks, 10px minor / 20px major, numbered every 5% |
| Mapping | Header height + 12px at the top, 12px bottom inset |
| Hover | 150ms intent/grace, exponential damping 10 |
| Wheel and drag | .12 / .18 interpolation, pointer capture, 4px click suppression |
| Track click | Up to 1.25s, distance-scaled exponential easing |
| Needle | 1px gold line, 6px glow, three rolling digits, first 3% fade |
| Sections | 20px vertical riding text, 16px queues/map, 34px active heading, staggered letter arcs |
| Idle snap | 400ms rest, .7s cubic resolution of a partial section flip |
| Tick intro | 1s draw, 10ms tick stagger |
| Frost | 9px backdrop blur, feathered rail and radial section pools |

## Ruler Tools Adaptations

The header is measured instead of assuming Artcraft's 48px navigation. Section links target existing Ruler Tools content. The home label fades into the rail instead of transforming the hero's main wordmark. Keyboard controls and ARIA progress are included. Fonts and accent colors use the existing theme.

The document remains the scroll container, preserving existing `scrollIntoView` navigation and the sticky header. Resize and font changes recalculate positions. Account dialog scroll locks hide the ruler and cancel active scrolling. Nested scrollers, form controls, browser zoom and touch input retain native handling. Idle snapping pauses while editing a field.

The interactive ruler appears at 1024px and above with a fine pointer and hover support. Smaller/touch layouts retain native scrolling. Reduced motion keeps the native scrollbar and static section links, with immediate ruler input.

## Validation

Source review only. No compiler, build, test, or Ruler Tools UI verification was run, following the project's instructions. Visual equivalence, device-specific wheel feel and runtime behavior remain for user review. No commit or deployment was made.
