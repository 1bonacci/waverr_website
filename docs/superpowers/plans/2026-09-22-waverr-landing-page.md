# waverr Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single static marketing page for waverr whose entire visual system is a directory index — the product's own subject matter used as its design language — with a CSS-drawn white click-wheel player as the one physical object placed inside the listing.

**Architecture:** Plain HTML/CSS/JS, no framework, no build step. One `index.html`, one `style.css` organized as tokens → listing primitives → regions, one small `script.js`. The page is composed on a single index grid (`name / meta / size` columns) that every region inherits; regions differ by how they occupy that grid, not by being separate card systems. Self-hosted Geist Mono variable woff2 is the only typeface.

**Tech Stack:** HTML5, CSS3 (custom properties, `subgrid`-free explicit grid, `@font-face` with a variable woff2, `@keyframes`), vanilla JavaScript with no dependencies, authored inline SVG for every icon and for the wheel's transport marks.

**Spec:** `docs/superpowers/specs/2026-09-22-waverr-landing-page-design.md`
**Product record:** `PRODUCT.md`
**Direction seed:** `ab9b946a` (impeccable, scope=direction, mode=persuade, assigned index 5)

## Direction Contract

This block is written verbatim into `index.html` as the first child of `<body>` in Task 1. Reproduced here so every task can check its work against it.

```
THESIS: This page is a directory listing of one program. It refuses the
dark-hero-plus-feature-cards arrangement every developer tool ships;
structure comes from columns, rules and rows, never from cards.

OWN-WORLD: Near-black ground, four greys, one ivory. Geist Mono at every
size, tracking tightening as size grows. Hairline column rules that run
the full page height. Rows with name left, metadata right-aligned in a
fixed column. The player is the only curved, light, physical object on
the page.

STORY: A producer sees their own filenames in the first viewport, reads
that this indexes folders rather than libraries, sees the device that
plays them, and downloads it.

FIRST VIEWPORT: Full-width index header row across the top. Left column:
the program's identity set as a listing entry at display scale. Right
column: the white player, bled to the top rule. The primary action sits
in the listing's own header row as a permanent entry, not a floating pill.

FORM: Directory index / file listing. Candidate 5 of 7, seed ab9b946a.

FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, and DESIGN.md
```

## Global Constraints

- **Greyscale only.** `--ink` `#0b0b0b`, `--paper` `#e8e8e6`, greys between, plus exactly one signal value `--live` `#c8c8c2` used only for the playing state and focus rings. No hue anywhere.
- **No build step, no dependencies.** No `package.json`, no bundler. Repo root is servable as-is.
- **One typeface**, Geist Mono variable, self-hosted from `assets/fonts/`. No second family, no system-font display fallback as the design voice.
- **No cards.** No element may have a background, a border on all four sides, and a heading-plus-text stack. Structure comes from rules and columns.
- **No eyebrows.** No small label above a heading, anywhere, ever.
- **No pills.** Actions are listing entries or underlined text, not rounded capsules.
- **Icons are drawn SVG** in one stroke weight. No unicode glyphs standing in for icons.
- **`prefers-reduced-motion` honored** — all animation stops, not slows.
- **Page works with JavaScript disabled** — every section renders, every link resolves.
- **Windows-only download messaging.** No macOS or Linux.
- **`REPO_URL` / `RELEASE_URL`** defined once in `script.js`, applied by `data-link`.
- **Claim only what PRODUCT.md records.** No invented users, downloads, stars, testimonials, or license.

## Review Focus

1. **`prefers-reduced-motion: reduce`** — the visualizer and the chase animation must be fully static, not slowed. (Task 5; re-verified Task 10.)
2. **JavaScript disabled** — every region renders and every Download/GitHub link still carries a real `https://` href rather than a stub. (Task 3; re-verified Task 10.)
3. **320px viewport** — the three-column index grid must collapse to a legible form with no horizontal scroll; the wheel must stay circular. (Task 9.)
4. **A long filename in a listing row** — must truncate in its own column without pushing the right-aligned metadata column out of alignment. (Task 4.)
5. **A screenshot of unexpected aspect ratio dropped into the gallery** — the slot must crop to its declared box rather than stretching or breaking row rhythm. (Task 8.)

---

## File Structure

```
waverr_website/
  index.html                  Direction contract, then all regions in order
  style.css                   Tokens → listing primitives → regions → responsive
  script.js                   URL constants, visualizer seeding, row clock
  assets/
    fonts/GeistMono[wght].woff2
    fonts/OFL.txt
    favicon.svg
    screenshots/.gitkeep
  README.md
  PRODUCT.md                  (exists)
  DESIGN.md                   (written at finish, Task 11)
```

`style.css` section order is fixed and every task appends only to its own
section: `/* == TOKENS == */`, `/* == INDEX PRIMITIVES == */`,
`/* == REGION: … == */` per region, `/* == RESPONSIVE == */` last.

---

### Task 1: Fonts, tokens, and the index grid primitives

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `assets/fonts/GeistMono[wght].woff2`, `assets/fonts/OFL.txt`
- Create: `assets/favicon.svg`, `assets/screenshots/.gitkeep`

**Interfaces:**
- Consumes: nothing.
- Produces: the tokens every later task uses — `--ink`, `--ink-2`, `--rule`, `--dim`, `--mid`, `--paper`, `--live`, `--col-meta`, `--col-size`, `--gut`, `--rule-w`. And the two structural primitives every region is built from: `.idx` (the three-column grid: name / meta / size) and `.row` (one listing line with its bottom hairline). Later tasks compose regions out of these and must not invent a second layout system.

- [ ] **Step 1: Fetch the typeface**

```bash
mkdir -p assets/fonts assets/screenshots
curl -L -o assets/fonts/GeistMono.zip \
  https://github.com/vercel/geist-font/releases/latest/download/geist-font.zip
```

Unzip and copy the variable monospace woff2 to
`assets/fonts/GeistMono[wght].woff2`. The archive's internal layout varies by
release — locate the file with:

```bash
unzip -l assets/fonts/GeistMono.zip | grep -i "mono.*woff2"
```

Copy the **variable** file (its name contains `[wght]` or `Variable`), not the
static weights. Then save the license beside it:

```bash
curl -L -o assets/fonts/OFL.txt \
  https://raw.githubusercontent.com/vercel/geist-font/main/OFL.txt
rm assets/fonts/GeistMono.zip
```

If the release URL 404s, download from https://vercel.com/font instead and
place the same variable woff2 at the same path. **Do not substitute a system
monospace** — the face is the page's entire voice, and the craft floor treats
the nearest installed font as a failure rather than a fallback.

Verify before continuing:

```bash
ls -la assets/fonts/
```

Expected: a `.woff2` file of roughly 40–120KB and `OFL.txt`.

- [ ] **Step 2: Write the document shell with the direction contract**

Create `index.html`. The contract comment is the first child of `<body>` and
must survive into any future build:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>waverr — index of a folder you already have</title>
<meta name="description" content="waverr indexes your project folders and plays untagged WAVs and MP3s through a click-wheel device drawn on screen. Free and open source, for Windows.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/GeistMono[wght].woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body>
<!--
THESIS: This page is a directory listing of one program. It refuses the
dark-hero-plus-feature-cards arrangement every developer tool ships;
structure comes from columns, rules and rows, never from cards.

OWN-WORLD: Near-black ground, four greys, one ivory. Geist Mono at every
size, tracking tightening as size grows. Hairline column rules that run
the full page height. Rows with name left, metadata right-aligned in a
fixed column. The player is the only curved, light, physical object on
the page.

STORY: A producer sees their own filenames in the first viewport, reads
that this indexes folders rather than libraries, sees the device that
plays them, and downloads it.

FIRST VIEWPORT: Full-width index header row across the top. Left column:
the program's identity set as a listing entry at display scale. Right
column: the white player, bled to the top rule. The primary action sits
in the listing's own header row as a permanent entry, not a floating pill.

FORM: Directory index / file listing. Candidate 5 of 7, seed ab9b946a.

FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, and DESIGN.md
-->
<header class="masthead"></header>
<main>
  <section id="top" class="region region--top"></section>
  <section id="why" class="region region--why"></section>
  <section id="does" class="region region--does"></section>
  <section id="screens" class="region region--screens"></section>
  <section id="get" class="region region--get"></section>
</main>
<footer class="colophon"></footer>
<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Write tokens and the index primitives**

Create `style.css`:

```css
/* == TOKENS ============================================== */
@font-face {
  font-family: "Geist Mono";
  src: url("assets/fonts/GeistMono[wght].woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

:root {
  /* The use scene decides this: a producer at their desk at night, room
     lights low, monitor the brightest thing present. The page is dark
     because the room is. */
  --ink:    #0b0b0b;   /* page ground */
  --ink-2:  #121212;   /* recessed ground */
  --rule:   #262626;   /* hairlines */
  --dim:    #5f5f5c;   /* metadata, inactive */
  --mid:    #9a9a95;   /* body copy */
  --paper:  #e8e8e6;   /* primary text, the device body */
  --live:   #c8c8c2;   /* the one signal: playing, focus */

  --col-meta: 13ch;    /* right-aligned metadata column */
  --col-size: 9ch;     /* right-aligned size column */
  --gut:      clamp(1rem, 2.4vw, 2rem);
  --rule-w:   1px;
  --page:     1240px;
}

* { box-sizing: border-box; }

html {
  color-scheme: dark;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--ink);
  color: var(--paper);
  font-family: "Geist Mono", ui-monospace, monospace;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.55;
  font-variant-ligatures: none;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; }
img { max-width: 100%; display: block; }

:focus-visible {
  outline: 1px solid var(--live);
  outline-offset: 3px;
}

/* == INDEX PRIMITIVES ==================================== */
/* Every region composes from these two. There is no second
   layout system on this page and no card anywhere. */

.idx {
  width: 100%;
  max-width: var(--page);
  margin-inline: auto;
  padding-inline: var(--gut);
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--col-meta) var(--col-size);
  column-gap: var(--gut);
}

/* A listing line. Its bottom hairline is the page's only divider. */
.row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: baseline;
  padding-block: 0.62rem;
  border-bottom: var(--rule-w) solid var(--rule);
}

@supports not (grid-template-columns: subgrid) {
  .row {
    grid-template-columns: minmax(0, 1fr) var(--col-meta) var(--col-size);
  }
}

.row__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row__meta,
.row__size {
  text-align: right;
  color: var(--dim);
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.row--head {
  border-bottom-color: var(--paper);
  padding-block: 0.5rem;
}

.row--head .row__name,
.row--head .row__meta,
.row--head .row__size {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dim);
}

/* Vertical column rules: the page's structural signature. Drawn as a
   repeating background on the region so they run its full height,
   independent of how many rows it holds. */
.ruled {
  background-image:
    linear-gradient(var(--rule), var(--rule)),
    linear-gradient(var(--rule), var(--rule));
  background-size: var(--rule-w) 100%, var(--rule-w) 100%;
  background-repeat: no-repeat;
  background-position:
    calc(100% - var(--col-size) - var(--gut) * 1.5) 0,
    calc(100% - var(--col-size) - var(--col-meta) - var(--gut) * 2.5) 0;
}

.region { padding-block: clamp(3.5rem, 7vw, 6rem); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

- [ ] **Step 4: Draw the favicon**

Create `assets/favicon.svg` — the wheel reduced to its essential ring, in the
page's own greys:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0b0b0b"/>
  <circle cx="32" cy="32" r="19" fill="none" stroke="#e8e8e6" stroke-width="4"/>
  <circle cx="32" cy="32" r="6.5" fill="#e8e8e6"/>
</svg>
```

- [ ] **Step 5: Create the screenshots placeholder**

PowerShell:

```powershell
New-Item -ItemType Directory -Force assets/screenshots
New-Item -ItemType File assets/screenshots/.gitkeep
```

- [ ] **Step 6: Verify the foundation**

Add a throwaway probe inside `#top` to prove the primitives work:

```html
<div class="idx ruled">
  <div class="row row--head">
    <span class="row__name">Name</span>
    <span class="row__meta">Modified</span>
    <span class="row__size">Size</span>
  </div>
  <div class="row">
    <span class="row__name">a_very_long_session_filename_that_should_truncate_cleanly.wav</span>
    <span class="row__meta">2026-09-21</span>
    <span class="row__size">48.2 MB</span>
  </div>
</div>
```

Open `index.html`.

Expected:
- Text renders in Geist Mono, not a system monospace. Confirm in DevTools: the computed `font-family` resolves and the Network tab shows the woff2 loaded (not a 404).
- Ground is `#0b0b0b`; toggling the OS to light mode changes nothing.
- Two faint vertical hairlines run the full height of the block, separating name from modified from size.
- The header row's underline is light; the data row's is dark grey.
- The long filename truncates with an ellipsis, and `2026-09-21` / `48.2 MB` stay right-aligned in their columns.

Then **delete the probe markup** — later tasks author the real rows.

- [ ] **Step 7: Commit**

```bash
git add index.html style.css assets/
git commit -m "feat: typeface, tokens, and index grid primitives"
```

---

### Task 2: The masthead as an index header

**Files:**
- Modify: `index.html` (`<header class="masthead">`)
- Modify: `style.css` (append `/* == REGION: MASTHEAD == */`)

**Interfaces:**
- Consumes: `.idx`, `.row`, `.row--head`, tokens from Task 1.
- Produces: the `data-link` convention (`repo` / `release`) that Task 3 wires and every later region reuses, and the `.entry` class — a listing-style action, which is this page's only button form.

- [ ] **Step 1: Write the masthead**

The masthead is the listing's header row, pinned. The primary action lives
inside it as an entry, per the direction contract — there is no floating pill.

Replace `<header class="masthead"></header>` with:

```html
<header class="masthead">
  <div class="idx masthead__inner">
    <a class="masthead__name" href="#top">waverr</a>
    <nav class="masthead__nav">
      <a class="entry" href="#why">why</a>
      <a class="entry" href="#does">what it does</a>
      <a class="entry" href="#screens">screens</a>
      <a class="entry" data-link="repo" href="https://github.com" rel="noopener">source</a>
      <a class="entry entry--live" data-link="release" href="https://github.com">download</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Style it**

Append to `style.css`:

```css
/* == REGION: MASTHEAD ==================================== */
.masthead {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--ink) 88%, transparent);
  backdrop-filter: blur(6px);
  border-bottom: var(--rule-w) solid var(--paper);
}

.masthead__inner {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  min-height: 46px;
}

.masthead__name {
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
}

.masthead__nav {
  display: flex;
  gap: 1.6rem;
  align-items: center;
}

/* The page's only action form: a listing entry, underlined on approach.
   Not a pill, not a filled rectangle. */
.entry {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
  text-decoration: none;
  padding-block: 0.15rem;
  border-bottom: var(--rule-w) solid transparent;
  transition: color 140ms ease, border-color 140ms ease;
}

.entry:hover { color: var(--paper); border-bottom-color: var(--paper); }

.entry--live {
  color: var(--paper);
  border-bottom-color: var(--live);
}
.entry--live:hover { border-bottom-color: var(--paper); }
```

- [ ] **Step 3: Verify**

Open `index.html`.

Expected:
- A thin bar pinned at the top, its lower edge a light 1px rule spanning the full width.
- `WAVERR` letterspaced at the left; five lowercase entries at the right.
- `download` is brighter than its neighbours and carries a faint underline; the others underline only on hover.
- Nothing is rounded and nothing is filled. If you see a capsule shape, the styling is wrong.
- Scrolling keeps the bar in place with the page dimly visible through it.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: masthead as pinned index header"
```

---

### Task 3: URL constants and link wiring

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: the `data-link` attributes authored in Task 2 and in Tasks 4, 6, 8, 9.
- Produces: `REPO_URL`, `RELEASE_URL`. No later task edits these; regions only add `data-link` attributes.

- [ ] **Step 1: Write the script**

Create `script.js`:

```js
/* ──────────────────────────────────────────────────────────
   The only two values that change at launch.
   Every download and source link on the page reads from here.
   ────────────────────────────────────────────────────────── */
const REPO_URL    = 'https://github.com/REPLACE_ME/waverr';
const RELEASE_URL = 'https://github.com/REPLACE_ME/waverr/releases';

(function applyLinks() {
  var map = { repo: REPO_URL, release: RELEASE_URL };
  document.querySelectorAll('[data-link]').forEach(function (el) {
    var url = map[el.getAttribute('data-link')];
    if (url) el.href = url;
  });
})();
```

- [ ] **Step 2: Verify, including the no-JS path**

Open `index.html` and run in the console:

```js
[...document.querySelectorAll('[data-link]')].map(a => a.getAttribute('data-link') + ' → ' + a.href)
```

Expected: every entry resolves to a `REPLACE_ME` URL — proof the script ran.

**No-JS check (Review Focus #2):** disable JavaScript in DevTools, reload, and
inspect the same links. Each must still carry `https://github.com` from its
authored `href`. A link showing `#` or an empty `href` is a defect — fix the
markup, not the script.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: URL constants and link wiring"
```

---

### Task 4: The opening region

**Files:**
- Modify: `index.html` (`<section id="top">`)
- Modify: `style.css` (append `/* == REGION: TOP == */`)

**Interfaces:**
- Consumes: `.idx`, `.row`, `.entry`, tokens.
- Produces: `.stage` — the container Task 5 places the device into. Task 5 must not alter this region's grid.

- [ ] **Step 1: Write the opening**

Per the contract: identity as a listing entry at display scale on the left,
device on the right bled to the top rule, real filenames present in the first
viewport. No heading label above anything.

```html
<section id="top" class="region region--top">
  <div class="idx region--top__inner">
    <div class="top__copy">
      <h1 class="top__title">Index of<br><span class="top__path">/your&nbsp;project&nbsp;folders</span></h1>
      <p class="top__lede">
        Every other player wants a tagged library. You have forty folders of
        takes that were never named for anyone but you. waverr indexes the
        folders as they are and plays them through a click wheel.
      </p>
      <div class="top__actions">
        <a class="entry entry--live" data-link="release" href="https://github.com">download for windows</a>
        <a class="entry" data-link="repo" href="https://github.com" rel="noopener">read the source</a>
      </div>
      <p class="top__fine">Free and open source. No account, no library, no cloud.</p>
    </div>
    <div class="top__stage stage"></div>
  </div>

  <div class="idx ruled top__listing">
    <div class="row row--head">
      <span class="row__name">Name</span>
      <span class="row__meta">Folder</span>
      <span class="row__size">Size</span>
    </div>
    <div class="row row--playing">
      <span class="row__name">idea_140bpm.wav</span>
      <span class="row__meta">sketches</span>
      <span class="row__size">38.1 MB</span>
    </div>
    <div class="row">
      <span class="row__name">beat_v3.wav</span>
      <span class="row__meta">sketches</span>
      <span class="row__size">52.7 MB</span>
    </div>
    <div class="row">
      <span class="row__name">demo_final_FINAL.wav</span>
      <span class="row__meta">mixdowns</span>
      <span class="row__size">61.4 MB</span>
    </div>
    <div class="row">
      <span class="row__name">vox_take7.mp3</span>
      <span class="row__meta">mixdowns</span>
      <span class="row__size">8.9 MB</span>
    </div>
    <div class="row row--more">
      <span class="row__name">4,912 more files</span>
      <span class="row__meta">indexed in ~1 s</span>
      <span class="row__size"></span>
    </div>
  </div>
</section>
```

The filenames and sizes are authored demonstration material, consistent with
PRODUCT.md's own examples. The `~1 s` and file count reflect the README's
measured figure of ~5,000 files scanning in about a second — the only
performance claim permitted.

- [ ] **Step 2: Style it**

Append to `style.css`:

```css
/* == REGION: TOP ========================================= */
.region--top { padding-top: clamp(2.5rem, 5vw, 4rem); padding-bottom: 0; }

.region--top__inner {
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  align-items: start;
  column-gap: clamp(2rem, 5vw, 4.5rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.top__title {
  margin: 0 0 1.6rem;
  font-size: clamp(2.3rem, 6.2vw, 4.6rem);
  font-weight: 500;
  line-height: 1.02;
  /* Tracking tightens as size grows — the world's type rule. */
  letter-spacing: -0.045em;
}

.top__path { color: var(--dim); }

.top__lede {
  margin: 0 0 2rem;
  max-width: 54ch;
  color: var(--mid);
  font-size: clamp(0.92rem, 1.1vw, 1.02rem);
  line-height: 1.7;
}

.top__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.top__actions .entry { font-size: 0.82rem; }

.top__fine {
  margin: 0;
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  color: var(--dim);
}

.top__stage { grid-column: 2; }

.top__listing { border-top: var(--rule-w) solid var(--rule); }

/* The one signal on the page: the row that is playing. */
.row--playing .row__name {
  color: var(--paper);
  position: relative;
  padding-left: 1.3rem;
}

.row--playing .row__name::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.44em;
  width: 0.5rem;
  height: 0.5rem;
  background: var(--live);
}

.row--playing .row__meta,
.row--playing .row__size { color: var(--mid); }

.row:not(.row--head):not(.row--more) .row__name { color: var(--mid); }

.row--more {
  border-bottom-color: transparent;
}
.row--more .row__name,
.row--more .row__meta { color: var(--dim); font-size: 0.8rem; }
```

- [ ] **Step 3: Verify**

Open `index.html`.

Expected:
- Two columns: title and copy left, an empty stage right (the device arrives in Task 5).
- "Index of / /your project folders" set large, tightly tracked, the path in grey.
- Two text actions, no capsules.
- Below the copy, a full-width listing with a `NAME / FOLDER / SIZE` header row, four filename rows, and a dimmed summary row.
- `idea_140bpm.wav` is brighter than the others and carries a small solid square to its left.
- Vertical hairlines run the listing's full height.

**Long-filename check (Review Focus #4):** temporarily change one row's name to
`session_2026_09_21_master_bounce_take_eleven_with_the_new_reverb.wav` and
reload.

Expected: it truncates with an ellipsis inside its own column; the folder and
size columns stay exactly where they were, aligned with every other row. Revert
the change.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: opening region with authored listing"
```

---

### Task 5: The device

**Files:**
- Modify: `index.html` (fill `.top__stage`)
- Modify: `style.css` (append `/* == REGION: DEVICE == */`)
- Modify: `script.js` (append visualizer seeding)

**Interfaces:**
- Consumes: `.stage` from Task 4, tokens.
- Produces: nothing. Self-contained.

The device is the page's only curved, light, physical object — the contract
says so, and that contrast is the whole reason it reads. Nothing else on the
page may be rounded or light.

- [ ] **Step 1: Write the device markup**

Transport marks are drawn SVG, not unicode glyphs.

```html
<div class="stage__device device" role="img"
     aria-label="The waverr player: a white handheld device with an LCD showing a track list and a visualizer, above a click wheel.">
  <div class="device__screen">
    <div class="device__bar">
      <span>ALL TRACKS</span>
      <span class="device__cell"></span>
    </div>
    <ul class="device__list">
      <li class="device__row device__row--on">idea_140bpm.wav</li>
      <li class="device__row">beat_v3.wav</li>
      <li class="device__row">demo_final_FINAL.wav</li>
      <li class="device__row">vox_take7.mp3</li>
    </ul>
    <div class="device__viz" aria-hidden="true">
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>

  <div class="device__wheel">
    <span class="device__menu">MENU</span>
    <svg class="device__mark device__mark--prev" viewBox="0 0 24 12" aria-hidden="true">
      <path d="M11 1 3 6l8 5V1Z"/><path d="M21 1l-8 5 8 5V1Z"/>
    </svg>
    <svg class="device__mark device__mark--next" viewBox="0 0 24 12" aria-hidden="true">
      <path d="M3 1l8 5-8 5V1Z"/><path d="M13 1l8 5-8 5V1Z"/>
    </svg>
    <svg class="device__mark device__mark--play" viewBox="0 0 28 12" aria-hidden="true">
      <path d="M4 1l8 5-8 5V1Z"/><rect x="17" y="1" width="3" height="10"/><rect x="23" y="1" width="3" height="10"/>
    </svg>
    <div class="device__center"></div>
  </div>
</div>
```

- [ ] **Step 2: Style the device**

Append to `style.css`:

```css
/* == REGION: DEVICE ====================================== */
.stage { display: flex; justify-content: center; }

.device {
  width: min(318px, 100%);
  padding: 20px 20px 28px;
  border-radius: 24px;
  background: linear-gradient(168deg, #fbfbfa 0%, #ededea 48%, #d6d6d2 100%);
  box-shadow:
    0 1px 1px rgba(255,255,255,.7) inset,
    0 -2px 6px rgba(0,0,0,.10) inset,
    0 34px 70px rgba(0,0,0,.66),
    0 8px 22px rgba(0,0,0,.42);
}

.device__screen {
  background: #0d0f0e;
  border-radius: 5px;
  padding: 9px 10px 7px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,.45) inset;
  color: #d4dbd8;
  font-size: 0.66rem;
}

.device__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.56rem;
  letter-spacing: 0.16em;
  color: #79857f;
  padding-bottom: 5px;
  margin-bottom: 6px;
  border-bottom: 1px solid #1e2321;
}

.device__cell {
  width: 15px; height: 7px;
  border: 1px solid #79857f;
  position: relative;
}
.device__cell::before {
  content: ""; position: absolute; inset: 1px; right: 5px; background: #79857f;
}

.device__list { list-style: none; margin: 0 0 8px; padding: 0; }

.device__row {
  padding: 2px 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #9aa6a1;
}

.device__row--on { background: #d4dbd8; color: #0d0f0e; }

.device__viz {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 30px;
  padding-top: 6px;
  border-top: 1px solid #1e2321;
}

.device__viz i {
  flex: 1;
  height: 14%;
  background: #8e9a95;
  animation: viz 820ms ease-in-out infinite alternate;
}

@keyframes viz {
  from { height: 10%; }
  to   { height: 100%; }
}

.device__wheel {
  position: relative;
  width: 186px; height: 186px;
  margin: 0 auto;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 30%, #fafaf9, #e2e2df 60%, #cbcbc7 100%);
  box-shadow:
    0 1px 2px rgba(255,255,255,.9) inset,
    0 -1px 4px rgba(0,0,0,.14) inset,
    0 3px 10px rgba(0,0,0,.18);
}

.device__center {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: 70px; height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 34%, #f6f6f5, #dcdcd9 68%, #c6c6c2 100%);
  box-shadow: 0 1px 3px rgba(0,0,0,.22), 0 1px 1px rgba(255,255,255,.9) inset;
}

.device__menu {
  position: absolute;
  top: 12px; left: 50%;
  transform: translateX(-50%);
  font-size: 0.54rem;
  letter-spacing: 0.14em;
  color: #86868a;
}

.device__mark {
  position: absolute;
  width: 22px;
  fill: #86868a;
}
.device__mark--prev { left: 13px; top: 50%; transform: translateY(-50%); }
.device__mark--next { right: 13px; top: 50%; transform: translateY(-50%); }
.device__mark--play { bottom: 12px; left: 50%; transform: translateX(-50%); width: 26px; }
```

- [ ] **Step 3: Seed the visualizer**

Append to `script.js`:

```js
/* Each bar gets its own rhythm; a synchronized block reads as a loading
   animation rather than audio. Skipped under reduced motion so no inline
   duration outlives the CSS that freezes it. */
(function seedVisualizer() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.device__viz i').forEach(function (bar) {
    bar.style.animationDuration = (460 + Math.random() * 620).toFixed(0) + 'ms';
    bar.style.animationDelay = '-' + (Math.random() * 900).toFixed(0) + 'ms';
  });
})();
```

- [ ] **Step 4: Verify**

Open `index.html`.

Expected:
- A white device in the right column, casting a deep shadow, unmistakably the
  only light and only rounded object on the page.
- Screen shows `ALL TRACKS`, a battery cell, four filenames with the first
  inverted, and a row of bars.
- Bars move at visibly different rates, not as one block.
- Wheel shows `MENU` at top, drawn double-triangles left and right, and a
  play-pause mark at the bottom — all as SVG, not text glyphs.
- The device's filenames match the listing below it.

**Reduced-motion check (Review Focus #1):** emulate `prefers-reduced-motion:
reduce`, reload. Bars must be completely frozen. Not slower — stopped.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: the device"
```

---

### Task 6: The 'why' region

**Files:**
- Modify: `index.html` (`<section id="why">`)
- Modify: `style.css` (append `/* == REGION: WHY == */`)

**Interfaces:**
- Consumes: `.idx`, `.row`, tokens.
- Produces: `.lead` — the large-type statement style Task 9 reuses for its
  closing statement. No other region introduces a second prose style.

- [ ] **Step 1: Write it**

A comparison expressed as two listings, which is the world's own way of making
an argument. No cards, no eyebrow.

```html
<section id="why" class="region region--why">
  <div class="idx">
    <h2 class="lead">
      Ordinary players assume you named things.<br>
      <span class="lead__dim">You were making music, not cataloguing it.</span>
    </h2>
  </div>

  <div class="idx compare">
    <div class="compare__side">
      <p class="compare__label">What a library player looks for</p>
      <ul class="compare__list">
        <li><span>Artist</span><em>—</em></li>
        <li><span>Album</span><em>—</em></li>
        <li><span>Title</span><em>—</em></li>
        <li><span>Track no.</span><em>—</em></li>
        <li><span>Year</span><em>—</em></li>
      </ul>
      <p class="compare__note">Five fields your session folder never filled in.</p>
    </div>
    <div class="compare__side compare__side--ours">
      <p class="compare__label">What waverr looks for</p>
      <ul class="compare__list">
        <li><span>The filename</span><em>idea_140bpm.wav</em></li>
        <li><span>The path</span><em>/beats/sept/sketches</em></li>
      </ul>
      <p class="compare__note">
        Both searchable by any fragment, anywhere inside them. Type
        <code>bpm</code> and <code>loop_140bpm.wav</code> comes back.
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style it**

Append to `style.css`:

```css
/* == REGION: WHY ========================================= */
.region--why { border-top: var(--rule-w) solid var(--rule); }

.lead {
  grid-column: 1 / -1;
  margin: 0 0 clamp(2.5rem, 5vw, 4rem);
  max-width: 24ch;
  font-size: clamp(1.5rem, 3.2vw, 2.45rem);
  font-weight: 500;
  line-height: 1.16;
  letter-spacing: -0.035em;
}

.lead__dim { color: var(--dim); }

.compare {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(2rem, 5vw, 4rem);
}

.compare__side { grid-column: span 1; }

/* The right-hand side is the product's answer; a single hairline on its
   left edge marks it without turning it into a panel. */
.compare__side--ours {
  padding-left: clamp(1.25rem, 3vw, 2.25rem);
  border-left: var(--rule-w) solid var(--rule);
}

.compare__label {
  margin: 0 0 1.1rem;
  padding-bottom: 0.5rem;
  border-bottom: var(--rule-w) solid var(--rule);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dim);
}

.compare__list { list-style: none; margin: 0 0 1.2rem; padding: 0; }

.compare__list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.5rem;
  border-bottom: var(--rule-w) solid var(--rule);
  font-size: 0.86rem;
}

.compare__list span { color: var(--mid); }

.compare__list em {
  font-style: normal;
  color: var(--dim);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.compare__side--ours .compare__list em { color: var(--paper); }

.compare__note {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--dim);
}

.compare__note code {
  color: var(--paper);
  font-size: 0.95em;
}
```

- [ ] **Step 3: Verify**

Expected:
- A large two-line statement, second line dimmed.
- Two columns beneath it. Left lists five tag fields, each with an em-dash —
  visibly empty. Right lists two, each with a real value in bright text.
- The right column is separated by a single vertical hairline, not enclosed in
  a box or given a background.
- Neither column is a card: no border on four sides, no fill, no radius.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: why region as a two-listing comparison"
```

---

### Task 7: The 'what it does' region

**Files:**
- Modify: `index.html` (`<section id="does">`)
- Modify: `style.css` (append `/* == REGION: DOES == */`)

**Interfaces:**
- Consumes: `.idx`, `.row`, tokens.
- Produces: nothing later tasks depend on.

The six capabilities are rows in a listing, not a grid of cards. This is the
plan's deliberate break from the earlier draft and from the category default.

- [ ] **Step 1: Write it**

```html
<section id="does" class="region region--does">
  <div class="idx">
    <h2 class="lead">What it does, in the order you meet it.</h2>
  </div>

  <div class="idx ruled does__listing">
    <div class="row row--head">
      <span class="row__name">Capability</span>
      <span class="row__meta">Where</span>
      <span class="row__size">Key</span>
    </div>

    <article class="row row--item">
      <span class="row__name">
        <b>One flat list of everything</b>
        No folder browsing. Every indexed file in a single list, sorted by
        folder then A–Z inside it, the folder shown on every row. Skipping
        forward walks the whole library instead of stopping at a folder's end.
      </span>
      <span class="row__meta">ALL TRACKS</span>
      <span class="row__size">↑ ↓</span>
    </article>

    <article class="row row--item">
      <span class="row__name">
        <b>Search that matches the middle of a word</b>
        A trigram index over filename and path, so a fragment finds a file
        wherever it sits in the name. Measured over 5,000 files: the slowest
        search took four milliseconds.
      </span>
      <span class="row__meta">any view</span>
      <span class="row__size">a–z 0–9</span>
    </article>

    <article class="row row--item">
      <span class="row__name">
        <b>A queue that respects what you asked for</b>
        What you queue by hand stays queued when you play something else — it
        waits its turn. A session that went well becomes permanent with
        SAVE AS PLAYLIST.
      </span>
      <span class="row__meta">QUEUE</span>
      <span class="row__size">hold ⏎</span>
    </article>

    <article class="row row--item">
      <span class="row__name">
        <b>Missing files keep their place</b>
        Unplug the drive and nothing is forgotten. A file that disappears is
        marked missing rather than removed, and keeps its favorites for when
        the drive comes back.
      </span>
      <span class="row__meta">ALL TRACKS</span>
      <span class="row__size">F</span>
    </article>

    <article class="row row--item">
      <span class="row__name">
        <b>A visualizer, because it is that kind of device</b>
        Real-time, drawn on the LCD, with modes you cycle while it plays.
      </span>
      <span class="row__meta">NOW PLAYING</span>
      <span class="row__size">V</span>
    </article>

    <article class="row row--item">
      <span class="row__name">
        <b>The formats that come out of a session</b>
        MP3, WAV, FLAC, M4A, AAC, OGG, Opus, AIFF and WMA are indexed and
        searchable. Playback is verified on MP3, WAV, M4A and OGG.
      </span>
      <span class="row__meta">SETTINGS</span>
      <span class="row__size">—</span>
    </article>
  </div>

  <div class="idx">
    <p class="does__caveat">
      AIFF files are indexed and searchable, but Chromium cannot decode them,
      so they will not play. Said here rather than discovered later.
    </p>
  </div>
</section>
```

The AIFF caveat is in PRODUCT.md as a real constraint. Stating a limitation
plainly is the world's voice — a datasheet does not hide a column.

- [ ] **Step 2: Style it**

Append to `style.css`:

```css
/* == REGION: DOES ======================================== */
.region--does { border-top: var(--rule-w) solid var(--rule); }

.row--item { padding-block: 1.5rem; align-items: start; }

.row--item .row__name {
  /* Items carry prose, so the truncation rule from the data rows is off. */
  white-space: normal;
  overflow: visible;
  max-width: 68ch;
  color: var(--mid);
  font-size: 0.88rem;
  line-height: 1.7;
}

.row--item .row__name b {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--paper);
  font-size: 1.02rem;
  font-weight: 500;
  letter-spacing: -0.015em;
}

.row--item .row__meta,
.row--item .row__size { padding-top: 0.25rem; }

.does__caveat {
  grid-column: 1 / -1;
  margin: 1.75rem 0 0;
  max-width: 62ch;
  font-size: 0.78rem;
  line-height: 1.7;
  color: var(--dim);
}
```

- [ ] **Step 3: Verify**

Expected:
- Six entries stacked as listing rows separated by hairlines — **not** a grid
  of boxes. If anything looks like a card, the markup is wrong.
- Each row: a bright bold line, grey prose beneath, and two right-aligned
  columns holding the app view name and the key.
- Column rules run the full height of the listing, through all six rows.
- Prose wraps normally and does not truncate; the right columns stay aligned.
- The caveat sits below in small dim type.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: capabilities as listing rows"
```

---

### Task 8: The screens region

**Files:**
- Modify: `index.html` (`<section id="screens">`)
- Modify: `style.css` (append `/* == REGION: SCREENS == */`)

**Interfaces:**
- Consumes: `.idx`, tokens.
- Produces: the slot contract — a slot is `<figure class="shot">` whose first
  child is either `<div class="shot__empty">` or `<img class="shot__img">`.
  Swapping one for the other needs no CSS change.

- [ ] **Step 1: Write it**

Honesty is the world's register: the slots say plainly that no screenshot is
here yet rather than showing a decorative grey rectangle pretending to be one.

```html
<section id="screens" class="region region--screens">
  <div class="idx">
    <h2 class="lead">Screens, once there are screens.</h2>
    <p class="screens__note">
      These slots are empty on purpose. Real captures of the running
      application go here — nothing on this page pretends to be one.
    </p>
  </div>

  <div class="idx screens__grid">
    <figure class="shot">
      <div class="shot__empty"><span>ALL TRACKS</span></div>
      <figcaption class="shot__cap">Every file in one list, folder on every row.</figcaption>
    </figure>
    <figure class="shot">
      <div class="shot__empty"><span>SEARCH</span></div>
      <figcaption class="shot__cap">Type any fragment; the list filters live.</figcaption>
    </figure>
    <figure class="shot">
      <div class="shot__empty"><span>NOW PLAYING</span></div>
      <figcaption class="shot__cap">Visualizer, seek, favorite.</figcaption>
    </figure>
    <figure class="shot">
      <div class="shot__empty"><span>QUEUE</span></div>
      <figcaption class="shot__cap">Reorder by hand, then save it as a playlist.</figcaption>
    </figure>
  </div>
  <!--
    To place a real screenshot, replace the .shot__empty div with:
      <img class="shot__img" src="assets/screenshots/all-tracks.png"
           alt="waverr showing the ALL TRACKS list" loading="lazy"
           width="1280" height="800">
    The slot is a fixed 16:10 box that crops to fill, so any aspect ratio
    keeps the row aligned.
  -->
</section>
```

- [ ] **Step 2: Style it**

Append to `style.css`:

```css
/* == REGION: SCREENS ===================================== */
.region--screens { border-top: var(--rule-w) solid var(--rule); }

.screens__note {
  grid-column: 1 / -1;
  margin: -1.5rem 0 clamp(2.25rem, 4vw, 3.25rem);
  max-width: 56ch;
  font-size: 0.82rem;
  line-height: 1.7;
  color: var(--dim);
}

.screens__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2.25rem);
}

.shot { grid-column: span 1; margin: 0; }

/* Empty slot and real image share one box, so swapping never reflows. */
.shot__empty,
.shot__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: center;
  border: var(--rule-w) solid var(--rule);
  background: var(--ink-2);
}

.shot__empty {
  display: grid;
  place-items: center;
}

.shot__empty span {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--dim);
}

.shot__cap {
  margin-top: 0.7rem;
  padding-top: 0.55rem;
  border-top: var(--rule-w) solid var(--rule);
  font-size: 0.78rem;
  color: var(--dim);
}
```

- [ ] **Step 3: Verify, including the swap**

Expected:
- Four 16:10 slots in two columns, each a thin-ruled rectangle on a slightly
  recessed ground with a centred label and a captioned rule beneath.
- Nothing rounded; nothing filled with a gradient.

**Aspect-ratio check (Review Focus #5):** temporarily replace the first
`.shot__empty` with an `<img class="shot__img">` pointing at any image on hand —
deliberately choose a square or very wide one. Reload.

Expected: the slot keeps its 16:10 shape, the image crops to fill, and the other
three slots do not change size or position. Revert before committing.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: screens region with honest empty slots"
```

---

### Task 9: Close, colophon, and responsive behavior

**Files:**
- Modify: `index.html` (`<section id="get">`, `<footer>`)
- Modify: `style.css` (append `/* == REGION: GET == */`, `/* == REGION: COLOPHON == */`, `/* == RESPONSIVE == */`)

**Interfaces:**
- Consumes: `.idx`, `.row`, `.entry`, `.lead`, tokens, and every region's grid.
- Produces: the finished page.

- [ ] **Step 1: Write the close and the colophon**

The close is a listing entry for the download — the same form as everywhere
else, at the largest scale on the page. Not an inverted band.

```html
<section id="get" class="region region--get">
  <div class="idx">
    <h2 class="lead">Point it at a folder and press play.</h2>
  </div>

  <div class="idx ruled get__listing">
    <div class="row row--head">
      <span class="row__name">File</span>
      <span class="row__meta">Platform</span>
      <span class="row__size">Cost</span>
    </div>
    <a class="row row--get" data-link="release" href="https://github.com">
      <span class="row__name">waverr — installer</span>
      <span class="row__meta">Windows</span>
      <span class="row__size">free</span>
    </a>
    <a class="row row--get" data-link="repo" href="https://github.com" rel="noopener">
      <span class="row__name">waverr — source</span>
      <span class="row__meta">GitHub</span>
      <span class="row__size">open</span>
    </a>
  </div>

  <div class="idx">
    <p class="get__fine">
      Built with Electron. Windows installer only — there is no macOS or
      Linux build. Nothing is uploaded anywhere; the index lives on your
      machine.
    </p>
  </div>
</section>

<footer class="colophon">
  <div class="idx colophon__inner">
    <span class="colophon__name">waverr</span>
    <a class="entry" data-link="repo" href="https://github.com" rel="noopener">github</a>
  </div>
</footer>
```

`<footer>` sits outside `<main>` — move it if the Task 1 skeleton placed it
otherwise.

- [ ] **Step 2: Style the close and colophon**

Append to `style.css`:

```css
/* == REGION: GET ========================================= */
.region--get { border-top: var(--rule-w) solid var(--rule); }

.get__listing { margin-bottom: 1.5rem; }

.row--get {
  text-decoration: none;
  padding-block: 1.15rem;
  transition: background-color 140ms ease;
}

.row--get .row__name {
  font-size: clamp(1.05rem, 2vw, 1.5rem);
  letter-spacing: -0.02em;
  color: var(--paper);
}

.row--get:hover { background: var(--ink-2); }
.row--get:hover .row__meta,
.row--get:hover .row__size { color: var(--mid); }

/* The download line carries the page's one signal mark. */
.row--get:first-of-type .row__name { position: relative; padding-left: 1.4rem; }
.row--get:first-of-type .row__name::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 0.55rem;
  height: 0.55rem;
  background: var(--live);
}

.get__fine {
  grid-column: 1 / -1;
  margin: 0;
  max-width: 62ch;
  font-size: 0.78rem;
  line-height: 1.7;
  color: var(--dim);
}

/* == REGION: COLOPHON ==================================== */
.colophon {
  border-top: var(--rule-w) solid var(--paper);
  padding-block: 1.6rem;
}

.colophon__inner {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}

.colophon__name {
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--dim);
}
```

- [ ] **Step 3: Write the responsive rules**

The index grid's collapse is the one genuinely tricky part of this page: three
columns cannot survive 320px, so metadata moves under the name rather than
shrinking.

Append to `style.css`:

```css
/* == RESPONSIVE ========================================== */
@media (max-width: 900px) {
  .region--top__inner { grid-template-columns: minmax(0, 1fr); row-gap: 3rem; }
  .top__stage { grid-column: 1; }
  .compare { grid-template-columns: minmax(0, 1fr); row-gap: 2.5rem; }
  .compare__side--ours { padding-left: 0; border-left: 0; padding-top: 2rem;
                          border-top: var(--rule-w) solid var(--rule); }
}

@media (max-width: 680px) {
  /* Three columns become one; metadata drops beneath the name and the
     vertical rules switch off, since there are no longer columns to divide. */
  :root { --col-meta: auto; --col-size: auto; }

  .idx,
  .row,
  .masthead__inner,
  .colophon__inner,
  .screens__grid,
  .compare { grid-template-columns: minmax(0, 1fr); }

  .ruled { background-image: none; }

  .row { row-gap: 0.25rem; }

  .row__meta,
  .row__size {
    text-align: left;
    grid-column: 1;
  }

  .row--head .row__meta,
  .row--head .row__size { display: none; }

  .row--item .row__meta,
  .row--item .row__size { display: inline; padding-top: 0; }

  .screens__grid { gap: 1.75rem; }

  .masthead__inner { row-gap: 0.4rem; padding-block: 0.6rem; }
  .masthead__nav { flex-wrap: wrap; gap: 0.9rem 1.1rem; }

  .device { width: 100%; max-width: 290px; }
  .device__wheel { width: 162px; height: 162px; }
  .device__center { width: 62px; height: 62px; }
}

@media (max-width: 380px) {
  .masthead__nav { gap: 0.7rem 0.85rem; }
  .entry { font-size: 0.72rem; }
}
```

- [ ] **Step 4: Verify at three widths**

**Desktop (1280px):**
- The close reads as two large listing entries, the installer line carrying the
  signal square. Hovering a line lifts its ground slightly — no capsule appears.
- The colophon's top rule is light, matching the masthead's bottom rule, so the
  page is bracketed by the listing's two strongest lines.

**Tablet (820px):**
- The opening stacks: copy, then the device.
- The comparison stacks with a horizontal rule between the two sides instead of
  a vertical one.

**Phone (320 × 640) — Review Focus #3:**
- Console check: `document.documentElement.scrollWidth <= window.innerWidth`
  returns `true`.
- Every listing row shows its name on one line with the metadata beneath in
  dim type; nothing is cut off at the right edge.
- Vertical column rules are gone, not squashed.
- The device fits with margin and the wheel is still circular — measure it:
  `getBoundingClientRect()` width and height on `.device__wheel` must be equal.
- The masthead's five entries wrap onto two lines and remain tappable.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: close, colophon, responsive collapse"
```

---

### Task 10: Detector, README, and the batched inspection round

**Files:**
- Create: `README.md`
- Modify: any of `index.html`, `style.css`, `script.js` that the pass finds defective

**Interfaces:**
- Consumes: the whole page.
- Produces: a deployable repository and the screenshots the finish review needs.

- [ ] **Step 1: Run the mechanical design detector**

Impeccable's hook is not active in this session, so run it once here:

```bash
node "C:/Users/Bonacci/.claude/plugins/cache/impeccable/impeccable/4.0.4/skills/impeccable/scripts/detect.mjs" --json index.html style.css
```

Fix everything mechanical it reports. Carry anything it flags that you
deliberately keep — mono as the page's voice is defended by the committed
world — into the finish reviewer's inputs rather than silently ignoring it.
Run it once; do not re-run after fixes.

- [ ] **Step 2: Write the README**

Create `README.md`:

````markdown
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

Every download and source link on the page reads from them.

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
````

- [ ] **Step 3: Run the batched inspection round**

Capture desktop (1440×900) and mobile (390×844) screenshots to files — the
finish reviewer has no browser and can only check what you hand it. Save to
`.impeccable/shots/desktop.png` and `.impeccable/shots/mobile.png`.

In the same round, check all of the following and batch every fix:

Contract fidelity — read the comment at the top of `index.html` and confirm the
render matches it:
- Structure comes from rules and columns. Count the cards on the page: the
  answer must be zero.
- The device is the only rounded, light object.
- The primary action lives in the listing, not in a floating pill.

Craft floor:
- Body text against `--ink` clears 4.5:1. `--mid` `#9a9a95` on `#0b0b0b` is
  roughly 8:1; `--dim` `#5f5f5c` is roughly 3.4:1 and is therefore permitted
  only for metadata and small print, never for body copy. Check every use of
  `--dim` and promote any body-sized text to `--mid`.
- No eyebrow labels anywhere. `.row--head` is a table header, which the world
  earns; a small label above a heading is not, and there must be none.
- Body measure stays inside 65–75ch.
- One authored motion moment (the visualizer), not scattered hover effects.
- Every icon is drawn SVG in one stroke weight.

Links (Review Focus #2):
```js
[...document.querySelectorAll('[data-link]')].map(a => a.href)
```
Expected: every URL resolves to a constant. Then disable JavaScript, reload,
and confirm every region still renders and every link still has an `https://`
href.

Reduced motion (Review Focus #1): emulate it; the visualizer must be frozen.

Palette:
```bash
grep -nE '#[0-9a-fA-F]{3,8}|rgba?\(' style.css
```
Every value must be greyscale or transparent black/white. Any hue is a defect.

Keyboard: tab through the page. Every link shows the `--live` focus outline and
the order follows the visual order.

- [ ] **Step 4: Commit**

```bash
git add README.md index.html style.css script.js
git commit -m "docs: README; fixes from inspection round"
```

---

### Task 11: Finish review and DESIGN.md

**Files:**
- Create: `DESIGN.md` (written by the documenter, not by hand)

**Interfaces:**
- Consumes: the built page and the screenshots from Task 10.
- Produces: the discharged FINISH line from the direction contract.

The contract's FINISH line says: *unreviewed and undocumented is unfinished*.
This task discharges it. Skipping it leaves the run abandoned at the finish
line, whatever the page looks like.

- [ ] **Step 1: Spawn the finish reviewer**

Spawn `impeccable-finish-reviewer` **fresh, with no inherited conversation
history**. Pass it: the original request, the confirmed direction answers, the
artifact path, both screenshot paths, the direction contract text, the
detector findings from Task 10, and the craft-floor reference path
(`C:/Users/Bonacci/.claude/plugins/cache/impeccable/impeccable/4.0.4/skills/impeccable/reference/craft-floor.md`).

Verify its return carries five contract sections. On an empty or thrashed
return, respawn once with identical inputs before doing anything else.

- [ ] **Step 2: Act on the verdict**

- If the first material fix is a **rebuild directive**, execute the rebuild
  immediately rather than patching — re-derive the named regions and send the
  result back for a verdict.
- Otherwise apply all material fixes in **one batch**, rebuild once, recapture
  the same two viewports, and send the recaptured screenshots back to the same
  reviewer for a verdict scoring each fix resolved / partial / unresolved.
- Fixes scored partial or unresolved earn one more batch. Two rounds is the
  budget; if items remain open after the second verdict, put the table in
  front of the user and let them choose between shipping and funding another
  round.
- Report the verdict table under the reviewer's own disposition word. A table
  with open material findings is never announced as a pass.

- [ ] **Step 3: Spawn the documenter**

Spawn `impeccable-documenter` with the project root, the artifact path, the
direction contract, `PRODUCT.md`, the document reference path
(`C:/Users/Bonacci/.claude/plugins/cache/impeccable/impeccable/4.0.4/skills/impeccable/reference/document.md`),
and the boundary to write at. It records `DESIGN.md` and its sidecar from the
**built** world rather than from this plan's intentions.

- [ ] **Step 4: Commit and deploy**

```bash
git add DESIGN.md .impeccable/
git commit -m "docs: DESIGN.md recorded from the built world"
git push
```

Then import the repository into Vercel per `README.md`. After the first
deploy, open the live URL and re-run the link check from Task 10 against it —
a deployed page with a broken download link is the one defect that matters
most here.

---

## Notes on deliberate omissions

- **No test runner.** The only JavaScript is applying two constants to a
  handful of `href` attributes and seeding animation delays. A DOM harness to
  assert that would cost more than it catches. Each task's verification step
  is the gate, and it checks rendering, which is what can actually break.
- **No second typeface.** A display face alongside the mono would be the
  intrusion in a listing world; scale and weight carry the hierarchy instead.
- **No license on the page.** PRODUCT.md records it as unknown. Add a colophon
  line once confirmed; do not guess.
- **`REPO_URL` / `RELEASE_URL` ship as `REPLACE_ME`.** Fill them before
  launch; the README says where.
