# Ruler Tools: disconnected frontend review

## Scope and source

Base: `6da9067` (`v0.0.0.2-RulerToolsScroll`). Review branch: `feat/frontend-readiness`.
Preserves the existing Expo/React Native directory, gold/navy palette, typography, crown branding, catalog, search, filtering and device saved stars. This is not a measuring-ruler application replacement.

Reference inspection: Domains-Database `AccountSidebar/index.web.tsx` (blob `5f9833ed3aafb4230c659747f10cd6eb3caabc5d`) and `ProfileSettings/index.web.tsx` (blob `35b47e6709349230e90fde3c81713bd94ca37dfa`): grouped account/admin navigation, dashboard children, bottom identity controls, disabled profile/settings geometry and privacy defaults. No reference data or credentials copied. Canonical guidance is BengaliBlush `7c26b2427ae7abeba3068a31661f4c18fbb20086` plus the shared disconnected-account-frontend workflow. Requested reverse-engineer-anything source was not available; reference-source inspection was used instead.

## Pages

- `/signin`, `/signup`, `/reset-password`: disabled credentials and provider controls, reciprocal links. No input accepted, credentials stored or login success simulated.
- `/profile`, `/connections`: authentication gate plus explicit read-only layout preview. Cloud profile name/email/bio/avatar, private visibility and unavailable cloud save/export/delete actions. A separate explicitly device-only display-name/bio draft is editable and saved locally without authentication.
- `/saved`: actual existing starred tool IDs restored from device storage, removable; storage errors are visible and unreadable data is not overwritten.
- `/toolkits`: device stars plus named device-persisted draft collections, selection/removal, limit 20 drafts and 60-character names. These use validated versioned AsyncStorage (localStorage on web) with serialized writes, visible save/read failures and an explicit confirmed clear action. Share is disabled; no share URL exists.
- `/dashboard`, `/analytics`: explicit preview gate, unavailable metrics (not zero), disabled report controls, source and freshness labels. No Vercel SDK or API calls.
- `/users`, `/catalog`, `/features`, `/feedback`: admin layout previews, table structures and unavailable actions. Web catalog shows only bundled public tool records. Native management view is a compact disconnected summary, not full table parity.
- `/contact`, `/help`: useful public support/discovery information. Existing About, Terms and Privacy retained and linked in footer/navigation. Contact links to Piratechs; no message-delivery claim.
- Unknown client routes show a not-found page, not the home directory. Hosting fallback still returns SPA HTTP 200; true 404 status needs future hosting route work.

Web workspace has a measured header offset, flush-left collapsible desktop rail, nested Dashboard navigation, bottom guest/profile control and themed responsive cards. Native has accessible inline navigation using the existing native shell. All admin previews contain no private data and confer no role.

## Future connection boundary

`src/shared/readiness/service.ts` is an unconfigured typed boundary, not a Firebase implementation. There are no environment credential reads or live subscriptions. Every mutation rejects. Toolkit subscription immediately reports unavailable and returns a cleanup function.

Before enabling Firebase: provision the approved project/database; configure Google/email Auth and authorized domains; map Firebase UID to app-owned user IDs; implement atomic ID allocation, verified account hydration and role/status checks; scope subscriptions and clear them on account change; create restrictive Firestore rules/indexes; implement allowlisted profile changes, private toolkit CRUD and explicit public sharing projections. Backend authorization must independently enforce Owner-only reporting/features and narrower admin operations. Never assign Owner by browser state or first signup. Migrate device stars only through explicit user-approved import, never silently claim account sync.

Provider reports require a private server endpoint verifying identity/current Owner capability, fixed project scope, bounded queries and server-only credentials. No telemetry enabled in this pass.

## SEO and submission boundaries

Added sitemap/robots, public canonical deployment origin, basic social metadata and route-specific client title/description/noindex. Root absolute asset links support deep links. Vercel SPA fallback and private-route X-Robots-Tag configuration are source only, not deployed. Public pages use the existing client-rendered router; static prerendering/server-rendered per-route metadata and real HTTP 404 responses remain launch follow-ups. Canonical origin and sitemap currently use the known `ruler-tools.vercel.app` deployment, not an unconnected custom domain. Update these together when a canonical domain is approved.

Not ready for app-store submission or AdSense approval merely from these pages. Remaining work includes owner review, runtime/native build checks, useful-content review, app signing/store metadata, actual backend/account deletion when accounts launch, current privacy/data-safety disclosures and policy/consent review before ads. No ad code, paid plans, billing, DNS or submissions added.

## Validation and delivery

Source and diff review only. Tests, type checks, builds, browser UI and native runtime checks were deliberately NOT run per AGENTS.md rule 1. No dependencies installed. Later explicit user request expanded drafts to local storage; no backend connection added. Review branch only; main is untouched and no manual deployment requested. A Git push may trigger repository-connected preview CI, which is not a production release.
