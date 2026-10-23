# TakeSync — website

Landing page for TakeSync, the audio-based multicam sync app. Version 1.0: Macs with Apple Silicon, Adobe Premiere Pro; Final Cut Pro and DaVinci Resolve in testing, Windows in development.
Static HTML/CSS/JS, no build step. 11 languages, like the app: English in the markup, the rest in `i18n.js` (generated: edit `tools/build_i18n.py`, run `python3 tools/build_i18n.py i18n.js`). Auto-detected from the browser, switch in the header.
Prices: eurozone visitors see the same numbers in euros; elsewhere the dollar price gets an approximate local amount (country from the time zone, then the browser language; rate from open.er-api.com, fallback in `main.js`).

- `index.html` — page (English copy lives in the markup)
- `main.js` — Ukrainian strings, language switch, scroll-synced hero timeline, parallax, overview video
- `styles.css` — styles

Hosted on Cloudflare (Workers static assets), connected to this repo: every push to `main` deploys automatically.
Build command: empty. Deploy command: `npx wrangler deploy` (config in `wrangler.jsonc`; files listed in `.assetsignore` are not published).
`_headers` sets caching and basic security headers on Cloudflare.
Download buttons point to this repo's latest release — attach the Apple Silicon `.dmg` there.
Overview video: put it at `media/takesync-overview.mp4` — the “Watch” button in the hero appears by itself once the file is published.
