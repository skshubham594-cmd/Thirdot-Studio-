# THIRDOT: React + Vite

This is the React version of the THIRDOT single-page site. It keeps the same design, copy, media and behaviour as the plain HTML/CSS/JS export, rebuilt as React components on Vite.

## Run it

    npm install
    npm run dev

Open the URL Vite prints (normally http://localhost:5173).

    npm run build     # production build into dist/
    npm run preview   # serve dist/ locally to check the build

Node 18 or newer is required.

## Structure

- `index.html`: page shell, meta tags, favicon and media preloads. Vite injects the bundle.
- `src/main.jsx`: mounts the app and loads the stylesheet.
- `src/App.jsx`: routes (React Router) and the shared header/footer. `/` is the home page, `/stories` the works showcase, anything else a small not-found page. Section links use `/#section-id` so they work from any page.
- `src/pages/`: `HomePage.jsx` (the original sections), `StoriesPage.jsx`, `NotFoundPage.jsx`.
- `src/components/`:
  - `Header.jsx`: brand, desktop nav, mobile menu (Escape and outside-click close it).
  - `Hero.jsx`: scroll-controlled balcony film with poster fallback and reduced-motion handling.
  - `About.jsx`, `Services.jsx`, `Journal.jsx`, `People.jsx`: content sections.
  - `Works.jsx` + `Works.css`: the Stories page's showcase with a ruler rail, autoplay cards in each video's native ratio (landscape 16:9 or portrait 9:16) and a blur + viewfinder-bracket + typewriter hover state. Rows come from `src/works.js`; each row's `aspect` ('16/9', '9/16', ...) picks the card shape, or leave it out to read the ratio from the video itself.
  - `Contact.jsx`: enquiry form with client-side checks and configurable destination.
  - `Footer.jsx`, `BrandDots.jsx`.
- `src/content.js`: navigation links, service cards, journal articles and the form's service options. Edit copy here.
- `src/config.js`: OPTIONAL enquiry endpoint or business email.
- `src/styles.css`: the original stylesheet, unchanged apart from font paths.
- `public/assets/`: photographs, desktop/mobile MP4s, posters, favicon and local fonts. Served at `/assets/...`.
- `licenses/`: licenses for the included open-source fonts.

Service descriptions, the brand story and journal articles still use native `<details>` elements.

## The enquiry form

No visitor submissions are saved or sent until you connect a destination. Set it in `src/config.js`, or copy `.env.example` to `.env` and fill in the `VITE_` variables (the `.env` values win when present; rebuild after changing them).

Option A: `contactEndpoint` (or `VITE_CONTACT_ENDPOINT`), an HTTPS endpoint you control.
It receives a JSON POST with name, email, service, message, consent and website (honeypot).
It must enable CORS for your site's origin if hosted on a different domain.
A 2xx response is treated as accepted unless the JSON body contains `ok:false`.
The endpoint must validate data, prevent spam and handle storage or email delivery server-side.
Never put secret API keys in browser JavaScript.

Option B: `contactEmail` (or `VITE_CONTACT_EMAIL`), your real business email, with the endpoint left blank.
The form then opens the visitor's email app with a prepared draft. The visitor must send it themselves.

If both are blank the form shows an honest configuration message and sends nothing.

## Deploy it

Run `npm run build` and upload the CONTENTS of `dist/` to any static host.
The site has real routes (`/stories`), so the host must serve `index.html` for paths it does not have a file for (Netlify: a `_redirects` file with `/* /index.html 200`; Vercel: a rewrite to `/index.html`; GitHub Pages: copy `index.html` to `404.html`). `npm run preview` already does this locally.
The site expects to be served from the domain root because media paths are absolute (`/assets/...`). To host under a sub-path, set `base` in `vite.config.js` and change the `/assets/` paths in `src/content.js`, the components, `src/styles.css` and `index.html` to match.
Serve MP4s as `video/mp4` with HTTP Range support for smooth scrubbing.
Once hosted, set an absolute `og:image` URL (and optionally a canonical URL) in `index.html`.

## Media and privacy

All depicted people and interiors are generated concept imagery, not THIRDOT employees, customers or actual premises.
No analytics, trackers, cookies or local-storage collection are included.
Review the included privacy explanation against your actual enquiry provider before launch.
