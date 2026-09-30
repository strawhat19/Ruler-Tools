# Ruler Tools

One Tool to Rule Them All. A frontend directory of useful websites, browser extensions, and mobile apps, built with Expo, React Native, TypeScript, and SCSS.

## Run locally

Use Node.js 22.13+ (22.x) or 24.3+ (24.x). This workspace's Node 23 is outside the versions supported by React Native and Metro; `.nvmrc` selects Node 24.

```sh
nvm install
npm install
npm run web
```

Use `npm start` for Expo's device launcher, or `npm run ios` / `npm run android` for an installed simulator. Web uses a responsive landing page; iOS and Android use a native directory screen with the same catalog and shared state.

If you do not use nvm, select a supported Node version with your preferred version manager and skip `nvm install`.

## What's included

- The supplied V9 crown wordmark and crown icon, without changes to their design.
- A static catalog of 14 tools, with official website and store links.
- Search, category filters, platform filters, alphabetical sorting, and saved tools.
- A local toolkit saved with AsyncStorage on the current device. No backend, accounts, or live API calls.
- Web manifest and favicon; Expo iOS and Android configuration.

Each component has its own folder. Web presentation uses semantic HTML and SCSS, while native presentation uses React Native styles. Shared state and catalog data live in `src/shared/`.

## Updating the catalog

Edit `src/shared/catalog.ts` to add or change directory entries. Categories and tool types are defined alongside it in `src/shared/types.ts`.

## Deployment later

`npm run export:web` produces `dist/` for static hosting on a custom domain. The app can be packaged for iOS and Android through Expo/EAS after you choose the final application identifiers, provide store artwork, and review the native version.

The web pages use `/about`, `/terms`, and `/privacy-policy`. Common aliases redirect permanently to those URLs: `about-us` and `aboutus`; `terms-of-use`, `terms-of-service`, `terms-and-conditions`, and `tos`; `privacy`, `privacy-notice`, `privacy_policy`, and `privacypolicy`. Known page URLs also normalize capitalization and trailing slashes.

Expo copies `public/`, including `public/.htaccess`, into the web export. On Apache 2.4, deploy all of `dist/` including the hidden `.htaccess` file, enable `mod_rewrite`, and allow `AllowOverride FileInfo` for the deployment directory. The relative rewrite rules support both a domain root and a subdirectory, serve known page URLs through `index.html`, and preserve existing files and unrelated paths. Apache host configuration changes are required if rewrites or overrides are disabled.

On other static hosts, configure the same permanent alias redirects and a SPA rewrite for `/about`, `/terms`, and `/privacy-policy` to the deployed app's `index.html`. Apply redirects before that rewrite and keep existing asset paths available. See the [Expo web publishing guide](https://docs.expo.dev/guides/publishing-websites/) for hosting and SPA fallback setup.

No tests, builds, or verification were run, following this project's instructions.
