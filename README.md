# Take a trip to Latin America — static site

Plain HTML/CSS/vanilla JS. No build step, no backend.

- `index.html`, `styles.css`, `app.js` — the app
- `content.json` — the data (31 countries; the home page count is computed from this file). Edit it and redeploy; nothing else to change.

Local preview: `python3 -m http.server 8000` in this folder, then open http://localhost:8000/

Per-country links (for QR codes): `https://<your-host>/#/<id>`, e.g. `#/peru`, `#/mexico`,
`#/costa-rica`, `#/dominican-republic`. The home page is `https://<your-host>/`.

Deploy: drag this folder into Netlify Drop, or push it to a GitHub repo and enable Pages
(the `.nojekyll` file is included). Hash routing means no redirect rules are needed.
