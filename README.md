# SynApp — website

Landing page for SynApp, the audio-based multicam sync app for macOS and Windows.
Static HTML/CSS/JS, no build step. English and Ukrainian (switch in the header; auto-detected from the browser).

- `index.html` — page (English copy lives in the markup)
- `main.js` — Ukrainian strings, language switch, before/after sync demo
- `styles.css` — styles

Hosted on Cloudflare Pages, connected to this repo: every push to `main` deploys automatically.
Build settings: framework preset **None**, build command **empty**, build output directory **/**.
`_headers` sets caching and basic security headers on Cloudflare.
Download buttons point to this repo's latest release — attach the `.dmg` and `.msi` there.
