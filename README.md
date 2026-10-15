# TakeSync — website

Landing page for TakeSync, the audio-based multicam sync app for macOS and Windows.
Static HTML/CSS/JS, no build step. English and Ukrainian (switch in the header; auto-detected from the browser).

- `index.html` — page (English copy lives in the markup)
- `main.js` — Ukrainian strings, language switch, before/after sync demo
- `styles.css` — styles

Hosted on Cloudflare (Workers static assets), connected to this repo: every push to `main` deploys automatically.
Build command: empty. Deploy command: `npx wrangler deploy` (config in `wrangler.jsonc`; files listed in `.assetsignore` are not published).
`_headers` sets caching and basic security headers on Cloudflare.
Download buttons point to this repo's latest release — attach the `.dmg` and `.msi` there.
