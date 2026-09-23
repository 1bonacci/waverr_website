# waverr landing page — design spec

Date: 2026-09-22

## Purpose

Single static marketing page for **waverr** (local audio player for music
producers, Electron desktop app). Only job: explain the product, look like
the product, and send interested visitors to two places — the public
GitHub repo and a Windows download.

No accounts, no forms, no backend, no analytics beyond what Vercel gives
for free. This is a billboard, not an app.

## Audience & success criteria

Audience: music producers / bedroom producers who have a folder full of
`.wav`/`.mp3` files with no tags, landing here from a GitHub link, Reddit,
Discord, or similar.

Success = visitor understands what the app does in one glance at the hero,
sees the click-wheel device and recognizes "this is a real MP3 player UI,"
and either clicks **Download** or **View on GitHub**.

## Constraints

- Static only — plain HTML/CSS/JS, no framework, no build step, no npm
  dependencies for the page itself. Deploys as-is to **Vercel** (static
  project, zero config).
- Palette: black / grey / white only, matching the waverr app chassis.
  No accent colors beyond greyscale + maybe one subtle glow color for the
  visualizer bars (optional, if it reads as "the app," not decoration).
- No images required to ship. Hero device is drawn in CSS/SVG. Real
  screenshots get dropped into the gallery section later as static files
  (`/assets/screenshots/*.png` or similar) — page ships with placeholder
  tiles until then.
- Repo URL and release download URL are placeholders (`REPO_URL_HERE`,
  `RELEASE_URL_HERE` as constants at the top of the HTML/JS, or an
  easy-to-find config block) until the user supplies the real GitHub URL.
- Download target: Windows NSIS installer (`.exe`) from GitHub Releases.
  README shows only `npm run build:win` — no evidence of Mac/Linux builds,
  so the site advertises Windows only. If no release exists yet at build
  time, the Download button still points at `.../releases` (repo's
  releases page) rather than a dead link, per user's confirmed choice (B).

## Content source of truth

Pulled from `waverr`'s README (already reviewed):

- **Tagline concept**: a local audio player with the interface of a
  classic MP3 player, built for people who produce their own music.
- **Problem**: ordinary players assume clean ID3 tags; producers have
  `beat_v3.wav`, `demo_final_FINAL.wav` scattered across project folders
  with no metadata. waverr indexes folders and searches by filename/path
  fragment instead.
- **Interface**: LCD screen, click wheel, visualizer — driven entirely by
  keyboard or entirely by mouse.
- **Feature list** (for the features grid):
  1. **Flat track list, instant search** — no folder browsing; every file
     in one A-Z-by-folder list; trigram search matches substrings anywhere
     (`bpm` finds `loop_140bpm.wav`).
  2. **Click wheel + full keyboard control** — every action reachable
     either way.
  3. **Queue & playlists** — manual queue persists across track changes;
     `SAVE AS PLAYLIST` turns a session into a lasting playlist.
  4. **Missing-file tracking** — a file that disappears from disk is
     marked missing, not deleted, keeping favorites intact.
  5. **Visualizer** — real-time, toggleable modes (`V` key).
  6. **Broad format support** — `.mp3 .wav .flac .m4a .aac .ogg .opus
     .aiff .aif .wma` indexed; MP3/WAV/M4A/OGG playback verified.
- **Performance note** (optional trust-building stat): ~5,000 files scan
  in ~1s, slowest search 4ms.

## Page structure

Single `index.html`, top to bottom:

1. **Nav** — sticky, minimal. "waverr" wordmark left. Right: GitHub icon
   link + "Download" button (small, secondary style here — main CTA lives
   in hero).
2. **Hero** — full-viewport-ish. Left or center: headline ("Your tracks,
   the way you actually keep them" or similar — final copy written during
   implementation, not locked here) + one-sentence subhead from the
   problem statement + two CTAs (Download primary, View on GitHub
   secondary/ghost button). Right or center-below: the CSS/SVG-drawn
   device — rounded white chassis, LCD screen showing a fake track list
   (a few filename-style rows: `beat_v3.wav`, `idea_140bpm.wav`, etc.) and
   small animated visualizer bars, click wheel below the screen. Device is
   the centerpiece — this is the "product shot."
3. **Problem/Pitch** — short narrative section, 2-3 sentences, black bg
   or dark grey, using the "ordinary players assume tags, producers
   don't have tags" contrast. Could pair with a tiny before/after visual
   (messy filename list vs. waverr's clean flat list) if it fits without
   extra asset work — otherwise text-only.
4. **Features grid** — 6 cards (list above), 2-3 columns responsive,
   icon or small mono-line glyph per card (drawn in CSS/SVG or simple
   unicode/inline-svg icons, not an icon font dependency), title + one
   line description each.
5. **Screenshot gallery** — heading ("See it in action" or similar), row
   of 3-4 placeholder tiles (grey rounded rectangles with a subtle
   "screenshot" label) sized/cropped consistently so real screenshots can
   be dropped in later without layout changes. Build this section so
   swapping a placeholder `div` for an `<img>` is the only change needed.
6. **Download/CTA band** — full-width band, high contrast (white on
   black or inverse of hero), restates Download button + GitHub link,
   maybe a one-liner like "Free, open source, Windows."
7. **Footer** — minimal: small wordmark, GitHub link, license mention if
   README/repo specifies one (unknown — check repo when URL is supplied;
   omit if absent), no other links.

## Visual design details

- **Palette**: pure black (`#0a0a0a`-ish, not pure `#000`), near-white
  (`#f5f5f5`-ish, not pure `#fff`), 3-4 grey steps between for borders/
  cards/shadows. Optional single glow accent (cool white or soft blue-grey)
  reserved for visualizer bars / active states only.
- **Typography**: one mono or pseudo-LCD display font for the device
  screen / headline accents (to sell the "MP3 player" feel), one clean
  sans for body copy. System font stack or a single self-hosted/Google
  Font — avoid extra network dependencies if possible (Vercel is fine with
  Google Fonts, but keep it to one family, two weights max).
- **Device rendering**: CSS + inline SVG, no canvas needed. LCD screen
  can be a `div` with monospace text rows + `box-shadow`/`filter` for a
  faint screen-glow; click wheel a circular gradient div; visualizer bars
  a handful of `div`s animated via CSS `@keyframes` (randomized heights
  or a looping pattern), not JS-driven audio (there's no real audio here
  — it's decorative).
- **Motion**: subtle only — visualizer bar pulse, maybe a slow device
  tilt/parallax on scroll or hover. No heavy animation libraries; CSS
  transitions/keyframes only, respecting `prefers-reduced-motion`.
- **Responsive**: single-column stack on mobile, device scales down but
  stays legible; nav collapses download/GitHub into visible icons (no
  hamburger menu needed for this few nav items).

## File layout

```
waverr_website/
  index.html
  style.css
  script.js           (tiny: mobile nav toggle if needed, visualizer
                        keyframe randomization if not pure CSS, smooth
                        scroll — kept minimal, no framework)
  assets/
    screenshots/       (empty/placeholder now, real screenshots land here)
    favicon.ico / .svg (simple mark, e.g. a click-wheel glyph)
  vercel.json          (only if needed — likely unnecessary; Vercel
                        auto-detects static root with index.html)
  README.md            (short: what this repo is, how to deploy)
```

No `package.json` required unless a font/icon dependency needs npm — plan
is to avoid that (system fonts or a single Google Fonts `<link>`).

## Deployment

Vercel, static project:
- Connect repo (once pushed to GitHub) or drag-and-drop deploy.
- No build command, no output directory override needed — root
  `index.html` is served as-is.
- Custom domain: out of scope for this spec (user can add later in
  Vercel dashboard).

## Out of scope

- Analytics/tracking scripts.
- Contact forms, newsletters, changelogs.
- Multi-page site (docs, blog) — single page only, per request.
- macOS/Linux download links (no evidence of builds; revisit if the repo
  adds them later).
- CMS or dynamic content — everything is static HTML edited by hand.

## Open items (placeholders to fill before/at launch)

- Public GitHub repo URL.
- GitHub Releases URL (or direct `.exe` asset link) once a release exists.
- License text for footer, if any.
- Final hero headline/subhead copy (drafted during implementation).
- Real screenshots to replace gallery placeholders.
