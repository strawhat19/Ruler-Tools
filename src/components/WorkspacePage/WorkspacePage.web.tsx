import './WorkspacePage.scss';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import { tools } from '../../shared/catalog';
import type { PageId } from '../../shared/routes';
import { routeRegistry } from '../../shared/routes';
import { accountRoutes, adminRoutes, recordsColumns, useWorkspacePage } from './WorkspacePage.logic';

export default function WorkspacePage() {
    const state = useWorkspacePage();
    const { page, meta, pageHref, linkTo } = state;
    const [collapsed, setCollapsed] = useState(false);
    const [preferenceReady, setPreferenceReady] = useState(false);
    const [preferenceError, setPreferenceError] = useState(``);
    const [headerHeight, setHeaderHeight] = useState(133);
    useEffect(() => {
        try { setCollapsed(localStorage.getItem(`ruler-tools:rail`) === `collapsed`); }
        catch { setPreferenceError(`Sidebar preference is available for this session only.`); }
        setPreferenceReady(true);
        const header = document.getElementById(`site-header`);
        if (!header) return;
        const update = () => setHeaderHeight(header.getBoundingClientRect().height);
        update();
        if (typeof ResizeObserver === `undefined`) return;
        const observer = new ResizeObserver(update); observer.observe(header);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!preferenceReady) return;
        try { localStorage.setItem(`ruler-tools:rail`, collapsed ? `collapsed` : `expanded`); }
        catch { setPreferenceError(`Sidebar preference is available for this session only.`); }
    }, [collapsed, preferenceReady]);
    const nav = (target: PageId) => <a key={target} id={`workspace-link-${target}`} className={`workspace-link`} href={pageHref(target)} onClick={linkTo(target)} aria-current={page === target ? `page` : undefined} aria-label={routeRegistry[target].label} title={routeRegistry[target].label}><Icon id={`workspace-icon-${target}`} name={routeRegistry[target].icon} size={18} /><span>{routeRegistry[target].label}</span></a>;
    const button = (label: string, id: string) => <button disabled type={`button`} id={id} className={`workspace-button`}><Icon id={`${id}-icon`} name={`shield`} size={16} />{label}</button>;
    const auth = meta.group === `auth`;
    const needsGate = [`profile`, `connections`, ...adminRoutes].includes(page);
    return <div id={`workspace`} className={`workspace ${collapsed ? `is-collapsed` : ``}`} style={{ '--workspace-header': `${headerHeight}px` } as CSSProperties}>
        <aside id={`workspace-rail`} className={`workspace-rail`} aria-label={`Account and design preview navigation`}>
            <div className={`workspace-nav-section`} id={`workspace-account-nav`}><h2>Account</h2>{accountRoutes.map(nav)}</div>
            <div className={`workspace-nav-section`} id={`workspace-admin-nav`}><h2>Admin Preview</h2>{nav(`dashboard`)}<details id={`workspace-dashboard-submenu`} open><summary>Dashboard Pages</summary><div className={`workspace-submenu`}>{adminRoutes.filter(route => ![`dashboard`, `feedback`].includes(route)).map(nav)}</div></details>{nav(`feedback`)}</div>
            <div className={`workspace-rail-footer`} id={`workspace-identity`}><span className={`workspace-avatar`} aria-label={`Guest, not signed in`}>?</span><a href={pageHref(`profile`)} onClick={linkTo(`profile`)} className={`workspace-identity-label`}>Profile · Guest</a><button id={`workspace-collapse`} type={`button`} onClick={() => setCollapsed(value => !value)} aria-label={collapsed ? `Expand sidebar` : `Collapse sidebar`} aria-expanded={!collapsed}><Icon id={`workspace-collapse-icon`} name={`menu`} /></button></div>
        </aside>
        <section id={`workspace-content`} className={`workspace-content`}>
            <p className={`section-eyebrow`} id={`workspace-eyebrow`}>{auth ? `YOUR NEXT TOOLKIT STARTS HERE` : `YOUR TOOLS. YOUR WAY.`}</p>
            <h1 id={`workspace-heading`}>{meta.label}</h1>
            <p className={`workspace-notice`} id={`workspace-connection-notice`} role={`status`}>{`Frontend preview · No Firebase, account login, sharing or analytics connection. Saved tool stars remain on this device.`}</p>
            {preferenceError && <p role={`status`}>{preferenceError}</p>}
            {state.localError && <p role={`alert`} className={`workspace-notice`}>{state.localError}</p>}
            {state.localError && state.canSave && <button type={`button`} id={`retry-device-save`} className={`workspace-button`} onClick={state.retryLocalSave}>Retry Device Save</button>}
            {state.localNotice && <p role={`status`} className={`workspace-caption`}>{state.localNotice}</p>}
            {page === `profile` && <section id={`local-profile`} className={`workspace-card`}><h2>Device-Only Profile Draft</h2><p>Keep a preferred display name and bio here for later. This does not create an account or publish a profile.</p><form onSubmit={event => { event.preventDefault(); state.saveLocalProfile(); }}><label htmlFor={`local-profile-name`}>Display name<input id={`local-profile-name`} disabled={!state.canSave} maxLength={100} value={state.profileDraft.name} onChange={event => state.setProfileDraft(current => ({ ...current, name: event.target.value }))} /></label><label htmlFor={`local-profile-bio`}>Bio<input id={`local-profile-bio`} disabled={!state.canSave} maxLength={1000} value={state.profileDraft.bio} onChange={event => state.setProfileDraft(current => ({ ...current, bio: event.target.value }))} /></label><button className={`workspace-button`} type={`submit`} disabled={!state.canSave}>Save On This Device</button></form></section>}
            {[`profile`, `toolkits`].includes(page) && <button type={`button`} id={`clear-local-workspace`} className={`workspace-button`} disabled={!state.ready} onClick={() => { if (window.confirm(`Clear your device-only profile draft and toolkits? This cannot be undone. Saved tool stars will stay.`)) void state.clearLocal(); }}>Clear Local Profile & Toolkits</button>}
            {auth ? <div className={`workspace-card workspace-auth`} id={`workspace-auth-card`}>
                <h2>{page === `signup` ? `Create your toolkit account` : page === `reset` ? `Reset your password` : `Welcome back`}</h2>
                <p>{`Authentication will be enabled after Firebase setup. These controls do not accept or store credentials yet.`}</p>
                <fieldset disabled id={`workspace-auth-fields`}><legend>{`Account details (not connected)`}</legend>
                    {page === `signup` && <label htmlFor={`auth-name`}>Name<input id={`auth-name`} autoComplete={`off`} placeholder={`Your name`} /></label>}
                    <label htmlFor={`auth-email`}>Email<input id={`auth-email`} type={`email`} autoComplete={`off`} placeholder={`you@example.com`} /></label>
                    {page !== `reset` && <label htmlFor={`auth-password`}>Password<input id={`auth-password`} type={`password`} autoComplete={`off`} placeholder={`Unavailable until connected`} /></label>}
                </fieldset>
                {button(page === `signup` ? `Create Account — Unavailable` : page === `reset` ? `Send Reset Link — Unavailable` : `Sign In — Unavailable`, `auth-submit`)}
                {page !== `reset` && <button disabled id={`auth-google`} type={`button`} className={`workspace-button`}><svg width={18} height={18} viewBox={`0 0 48 48`} aria-hidden><path fill={`#4285F4`} d={`M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.9Z`} /><path fill={`#34A853`} d={`M24 44c5.4 0 10-1.8 13.4-4.6l-6.6-5c-1.8 1.2-4.1 1.9-6.8 1.9-5.2 0-9.6-3.5-11.2-8.2H6v5.2A20 20 0 0 0 24 44Z`} /><path fill={`#FBBC05`} d={`M12.8 28.1a12 12 0 0 1 0-8.2v-5.2H6a20 20 0 0 0 0 18.6l6.8-5.2Z`} /><path fill={`#EA4335`} d={`M24 11.7c2.9 0 5.5 1 7.5 2.9l5.6-5.6A20 20 0 0 0 6 14.7l6.8 5.2c1.6-4.7 6-8.2 11.2-8.2Z`} /></svg>{`Continue With Google — Unavailable`}</button>}
                <div className={`workspace-inline-links`}>{nav(page === `signup` ? `signin` : `signup`)}{nav(`reset`)}</div>
            </div> : <>
                {needsGate && <div id={`workspace-access-gate`} className={`workspace-card`}><h2>{`Sign in to view this`}</h2><p>{meta.group === `admin` ? `Live administration will require a trusted authorized role. Analytics and feature management are reserved for Owner. No private records are loaded here.` : `A connected account is required to load and save your private profile.`}</p><div className={`workspace-inline-links`}>{nav(`signin`)}{nav(`signup`)}<button id={`workspace-preview-toggle`} className={`workspace-button`} type={`button`} onClick={() => state.setPreview(!state.preview)}>{state.preview ? `Hide Design Preview` : `View Read-Only Design Preview`}</button></div></div>}
                {(!needsGate || state.preview) && <div id={`workspace-preview-content`}>
                    {needsGate && <p className={`workspace-caption`}>{`Design preview only. This does not authenticate you or grant a role.`}</p>}
                    {page === `profile` && <div className={`workspace-card`}><div className={`workspace-profile-heading`}><span className={`workspace-avatar`}>?</span><div><h2>Profile & Privacy</h2><p>Account details appear after sign-in.</p></div></div><fieldset disabled><legend>Profile details</legend>{[`Name`, `Email`, `Bio`, `Avatar URL`].map(label => <label key={label} htmlFor={`profile-${label.replaceAll(` `, `-`)}`}>{label}<input id={`profile-${label.replaceAll(` `, `-`)}`} placeholder={`Not connected`} /></label>)}<label>Visibility<select id={`profile-visibility`} defaultValue={`private`}><option value={`private`}>Private</option><option value={`public`}>Public</option></select></label><label><input type={`checkbox`} id={`profile-share`} />Share my toolkits (off)</label></fieldset>{button(`Save Profile — Unavailable`, `profile-save`)}{button(`Export Account — Unavailable`, `profile-export`)}{button(`Delete Account — Unavailable`, `profile-delete`)}</div>}
                    {page === `connections` && <div className={`workspace-card`}><h2>Private Connections</h2><p>No providers are connected. Provider credentials must stay in private server-managed storage, never in your public profile.</p>{[`Google sign-in`, `Email and password`, `Firestore sync`].map(label => <p key={label} className={`workspace-status-row`}><span>{label}</span><span>Not Connected</span></p>)}{button(`Manage Connections — Unavailable`, `connections-manage`)}</div>}
                    {(page === `saved` || page === `toolkits`) && <><div className={`workspace-card`}><h2>Saved On This Device</h2><p>These are your existing starred tools, not cloud-synced account records.</p>{state.storageError && <p role={`alert`}>{state.storageError}</p>}{!state.saved.length ? <p>No saved tools yet. Explore the directory and star a tool to start.</p> : state.saved.map(tool => <div key={tool.id} className={`workspace-tool-row`} id={`saved-tool-${tool.id}`}><a href={tool.url} target={`_blank`} rel={`noopener noreferrer`}>{tool.name} ↗</a><button type={`button`} onClick={() => state.toggleSaved(tool.id)} aria-label={`Remove ${tool.name} from saved tools`}>Remove</button></div>)}{nav(`home`)}</div>{page === `toolkits` && <div className={`workspace-card`}><h2>Toolkit Drafts</h2><p>Saved in this browser or device only. These drafts are not cloud-synced, public or shared. Clearing site data removes them.</p><form onSubmit={event => { event.preventDefault(); state.createDraft(); }}><label htmlFor={`toolkit-name`}>Toolkit name<input id={`toolkit-name`} maxLength={60} value={state.name} onChange={event => state.setName(event.target.value)} /></label><fieldset><legend>Choose from your saved tools</legend>{state.saved.map(tool => <label key={tool.id} htmlFor={`toolkit-select-${tool.id}`}><input id={`toolkit-select-${tool.id}`} type={`checkbox`} checked={state.selected.includes(tool.id)} onChange={() => state.toggleSelected(tool.id)} />{tool.name}</label>)}</fieldset><button className={`workspace-button`} type={`submit`} disabled={!state.canSave || !state.name.trim() || state.drafts.length >= 20}>＋ Create Device Toolkit</button></form>{state.drafts.map((draft, index) => <div className={`workspace-tool-row`} id={`toolkit-draft-${index}`} key={index}><span>{draft.name} · {draft.toolIds.length} tool(s) · Private Draft</span><button type={`button`} aria-label={`Remove draft ${draft.name}`} onClick={() => state.setDrafts(current => current.filter((_, i) => i !== index))}>Remove</button></div>)}{button(`Share Toolkit — Unavailable`, `toolkit-share`)}</div>}</>}
                    {(page === `dashboard` || page === `analytics`) && <><div className={`workspace-metrics`}>{[`Visitors`, `Page Views`, `Accounts`, `Cloud Toolkits`].map(label => <div className={`workspace-card`} key={label}><h2>{label}</h2><strong>—</strong><p>Not Connected</p></div>)}</div><div className={`workspace-card`}><h2>Traffic</h2><fieldset disabled><legend>Report controls</legend><label>Period<select defaultValue={`7`}><option value={`7`}>Last 7 Days</option><option value={`30`}>Last 30 Days</option></select></label><label>Breakdown<select><option>Overview</option><option>Countries</option><option>Sources</option><option>Pages</option><option>Devices</option></select></label></fieldset><div className={`workspace-chart-empty`} role={`status`}>No measurements available. Connect an Owner-authorized reporting endpoint to load Vercel data.</div><p className={`workspace-caption`}>Source: unavailable · Last fetched: never · No tracking SDK enabled</p>{button(`Refresh — Unavailable`, `analytics-refresh`)}</div></>}
                    {recordsColumns[page] && <div className={`workspace-card`}><h2>{meta.label}</h2><p>{page === `catalog` ? `Bundled directory snapshot, read only. This is not a cloud CMS.` : `No backend records loaded. Administration actions remain disabled.`}</p><div className={`workspace-table-wrap`}><table id={`workspace-records-table`}><thead><tr>{recordsColumns[page]?.map(column => <th key={column} scope={`col`}>{column}</th>)}</tr></thead><tbody>{page === `catalog` ? tools.map((tool, index) => <tr key={tool.id} id={`catalog-row-${tool.id}`}><td>{index + 1}</td><td>{tool.name}</td><td>{tool.category}</td><td>{tool.platform}</td><td><span className={`rowStatus`}><span className={`statusDotWrap`}><span className={`statusDot`} /></span><span className={`statusText`}>Bundled</span></span></td><td className={`actionsCell`}>{button(`Edit`, `catalog-edit-${tool.id}`)}</td></tr>) : <tr><td colSpan={recordsColumns[page]?.length}>Unavailable until connected</td></tr>}</tbody></table></div>{button(`Add / Manage — Unavailable`, `records-manage`)}</div>}
                </div>}
            </>}
        </section>
    </div>;
}
