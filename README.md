# TakeSync — website

Landing page for TakeSync, the audio-based multicam sync app. Version 1.0.1: Macs with Apple Silicon; Adobe Premiere Pro, Final Cut Pro and DaVinci Resolve; Windows in testing.
Static HTML/CSS/JS, no build step. 11 languages, like the app: English in the markup, the rest in `i18n.js` (generated: edit `tools/build_i18n.py`, run `python3 tools/build_i18n.py i18n.js`). Auto-detected from the browser, switch in the header.
Prices: always in US dollars (what Paddle charges); outside the US an approximate local amount is shown underneath (country from the time zone, then the browser language; rate from open.er-api.com, fallback in `main.js`).

- `index.html` — page (English copy lives in the markup)
- `main.js` — Ukrainian strings, language switch, scroll-synced hero timeline, parallax, overview video
- `styles.css` — styles

Hosted on Cloudflare (Workers static assets), connected to this repo: every push to `main` deploys automatically.
Build command: empty. Deploy command: `npx wrangler deploy` (config in `wrangler.jsonc`; files listed in `.assetsignore` are not published).
`_headers` sets caching and basic security headers on Cloudflare.
Download buttons point to `/download/TakeSync.dmg`. Either put the file in `download/` (Workers static assets allow up to 25 MiB per file) or, for a bigger file, upload it to a Cloudflare R2 bucket and add a `_redirects` line: `/download/TakeSync.dmg https://<your-r2-domain>/TakeSync.dmg 302`.
Overview video: put it at `media/takesync-overview.mp4` — the “Watch” button in the hero appears by itself once the file is published.

## Legal pages
`privacy.html`, `terms.html`, `refund.html` are generated: edit `legal/*.md`, then `python3 tools/build_legal.py` (`pip install markdown`). It refuses to build while `[PLACEHOLDERS]` remain. `legal/` and `tools/` are not published.
