# THIRDOT: React + Vite

The THIRDOT Creative website: a black, editorial studio site (Inter Tight, fluted-glass hero, scroll-lit statements, white footer) built with React and Vite.

## Run it

    npm install
    npm run dev

Open the URL Vite prints (normally http://localhost:5173).

    npm run build     # production build into dist/
    npm run preview   # serve dist/ locally to check the build

Node 18 or newer is required.

## Structure

- `index.html`: page shell, meta tags, favicon and the hero poster preload. Vite injects the bundle.
- `src/main.jsx`: mounts the app and loads the Inter Tight font and the stylesheet.
- `src/App.jsx`: routes and the shared header, cursor and footer. `/` home, `/work` all reels (`/stories` redirects there), `/studio`, `/contact`, anything else a not-found page. Section links use `/#section-id` so they work from any page.
- `src/pages/`: `HomePage.jsx`, `WorkPage.jsx`, `StudioPage.jsx`, `ContactPage.jsx`, `NotFoundPage.jsx`.
- `src/components/`:
  - `Header.jsx`: brand, centre nav, Contact, and a full-screen phone menu. Drawn in difference blend mode so it reads on black and white.
  - `Hero.jsx`: the intro film behind fluted glass, disciplines, statement, "Watch the intro" and the mint wordmark.
  - `WorkPreview.jsx`, `AboutTeaser.jsx`, `ServiceList.jsx`, `Brands.jsx`, `Process.jsx`, `CallToAction.jsx`: home sections (several are reused on Studio).
  - `Works.jsx` + `Works.css`: the masonry wall of reels on `/work`. Rows come from `src/works.js`.
  - `Lightbox.jsx` + `Lightbox.css`: the blurred-backdrop video player used everywhere a film opens.
  - `ContactForm.jsx`: enquiry form with client-side checks and configurable destination.
  - `SectionHead.jsx` (title, (label) and drawn rule), `ScrollText.jsx` (words light up on scroll), `Reveal.jsx` (fade-up on enter), `Wordmark.jsx` (full-width SVG wordmark), `Cursor.jsx` (dot cursor), `Footer.jsx`, `BrandDots.jsx`.
- `src/lib/`: `smoothScroll.js` (Lenis smooth scrolling), `hooks.js` (reveal-on-scroll), `usePageTitle.js`.
- `src/content.js`: all copy: nav, hero lines, about, services, brands, process, studio text, notes, socials, email. Edit text here.
- `src/works.js`: the reels (video, poster, client, title).
- `src/config.js`: OPTIONAL enquiry endpoint or business email.
- `src/styles.css`: site styles.
- `public/assets/`: reels and posters (`stories/`), the intro film (`hero/`), studio stills (`studio/`), favicon and social image. Served at `/assets/...`.

Smooth scrolling, the cursor and all entrance animations switch off with the visitor's reduced-motion setting.

## The enquiry form

No visitor submissions are saved or sent until you connect a destination. Set it in `src/config.js`, or copy `.env.example` to `.env` and fill in the `VITE_` variables (the `.env` values win when present; rebuild after changing them).

Option A: `contactEndpoint` (or `VITE_CONTACT_ENDPOINT`), an HTTPS endpoint you control.
It receives a JSON POST with name, email, service, message, consent and website (honeypot).
It must enable CORS for your site's origin if hosted on a different domain.
A 2xx response is treated as accepted unless the JSON body contains `ok:false`.
The endpoint must validate data, prevent spam and handle storage or email delivery server-side.
Never put secret API keys in browser JavaScript.

Option B (the current setup): `contactEmail` (or `VITE_CONTACT_EMAIL`), set to thirdotcreative@gmail.com, with the endpoint left blank.
The form then opens the visitor's email app with a prepared draft. The visitor must send it themselves.

If both are blank the form shows an honest configuration message and sends nothing.

## Deploy it

Run `npm run build` and upload the CONTENTS of `dist/` to any static host.
The site has real routes (`/work`, `/studio`, `/contact`), so the host must serve `index.html` for paths it does not have a file for (Netlify: a `_redirects` file with `/* /index.html 200`; Vercel: a rewrite to `/index.html`; GitHub Pages: copy `index.html` to `404.html`). `npm run preview` already does this locally.
The site expects to be served from the domain root because media paths are absolute (`/assets/...`). To host under a sub-path, set `base` in `vite.config.js` and change the `/assets/` paths in `src/content.js`, the components, `src/styles.css` and `index.html` to match.
Serve MP4s as `video/mp4` with HTTP Range support so playback starts before the whole file loads.
Once hosted, set an absolute `og:image` URL (and optionally a canonical URL) in `index.html`.

## Media and privacy

No analytics, trackers, cookies or local-storage collection are included.
Review the included privacy explanation against your actual enquiry provider before launch.
