# waverr website

The single-page site for [waverr](https://github.com/REPLACE_ME/waverr), a
local audio player with the interface of a classic MP3 player.

Static HTML, CSS and JavaScript. No build step, no dependencies.

## Local preview

Open `index.html` directly, or serve the folder:

```
npx serve .
```

## The two URLs

Both live at the top of `script.js`:

```js
const REPO_URL    = 'https://github.com/REPLACE_ME/waverr';
const RELEASE_URL = 'https://github.com/REPLACE_ME/waverr/releases';
```

Every download and source link on the page reads from them. **These are
placeholders — replace them with the real waverr repository URL before
deploying.**

## Adding screenshots

Put the files in `assets/screenshots/`, then in the screens section replace a
slot:

```html
<div class="shot__empty"><span>ALL TRACKS</span></div>
```

with:

```html
<img class="shot__img" src="assets/screenshots/all-tracks.png"
     alt="waverr showing the ALL TRACKS list" loading="lazy"
     width="1280" height="800">
```

Slots are a fixed 16:10 box that crops to fill, so any aspect ratio keeps the
row aligned.

## Typeface

Geist Mono, self-hosted from `assets/fonts/`, SIL Open Font License
(`assets/fonts/OFL.txt`). It is the page's only typeface and its entire
typographic voice — do not replace it with a system monospace.

## Deploying to Vercel

1. vercel.com → **Add New… → Project** → import this repository.
2. Framework Preset: **Other**.
3. Leave Build Command, Output Directory and Install Command empty.
4. **Deploy**.

Every push to `main` redeploys.

## Design record

- Product truth: `PRODUCT.md`
- Visual system: `DESIGN.md`
- Spec: `docs/superpowers/specs/2026-09-22-waverr-landing-page-design.md`
- Plan: `docs/superpowers/plans/2026-09-22-waverr-landing-page.md`
