---
name: waverr
description: A directory index of one program — alternating near-black and paper bands, hairline column rules, and one white handheld device rendered in 3D.
colors:
  ink: "#0b0b0b"
  ink-2: "#121212"
  rule: "#262626"
  dim: "#5f5f5c"
  mid: "#9a9a95"
  paper: "#e8e8e6"
  live: "#c8c8c2"
  # Light-band counterparts. The page alternates ground rather than sitting on
  # one value; every role below is the same role inverted, so one set of
  # component rules serves both bands by reading role tokens.
  lit: "#ececea"
  lit-2: "#e0e0dd"
  lit-rule: "#c9c9c4"
  lit-dim: "#605f5b"
  lit-mid: "#3d3d3a"
  lit-ink: "#101010"
  lit-live: "#0b0b0b"
  # Device-local values. These exist only inside .device__* and are
  # deliberately not page tokens: the player is the one object on the page
  # with its own material, and its LCD carries a faint phosphor tint that
  # the page palette must never pick up.
  # The screen is a backlit LCD, not a monochrome phosphor panel: it renders
  # the application's real Home menu, so it carries the product's selection
  # blue. These values exist only inside .device__* and are deliberately not
  # page tokens — the page palette must never pick up the screen's hues.
  lcd-ground: "#eef2f7"
  lcd-ground-mid: "#dde5ee"
  lcd-ground-2: "#d3dce8"
  lcd-text: "#1d2733"
  lcd-dim: "#2b3542"
  lcd-chrome: "#58616d"
  lcd-rule: "#b9c0ca"
  lcd-select: "#1667d4"
  lcd-select-text: "#ffffff"
  lcd-chev: "#7d8894"
  lcd-bar: "#4a7fc4"
  # Chassis material. The shell is a lit solid with genuine edge faces, so it
  # carries a light falloff and two darker values for the turned-away edges.
  device-face-hi: "#fdfdfc"
  device-face-lo: "#cfcfca"
  device-edge-hi: "#b4b4af"
  device-edge-lo: "#8d8d88"
  device-wheel: "#ededea"
  device-mark: "#8b8b90"
typography:
  display:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 6vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 3.2vw, 2.45rem)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "1.02rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "-0.015em"
  listing:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(0.92rem, 1.1vw, 1.02rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  meta:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.02em"
  label:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.14em"
  entry:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.08em"
  wordmark:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.86rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "0.2em"
  # Device-local steps. A handheld LCD sets type smaller than any page-level
  # step, so these sit below the ramp on purpose and apply only inside
  # .device__*. Do not use them for page copy.
  device-screen:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.66rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  device-statusbar:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.56rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.16em"
  device-wheel-label:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.54rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.14em"
rounded:
  none: "0"
  edge: "3px"      # the device's turned edge faces
  select: "2px"    # a selected row on the LCD
  lcd: "6px"
  device: "26px"
  wheel: "50%"
spacing:
  gutter: "clamp(1rem, 2.4vw, 2rem)"
  row: "0.62rem"
  row-head: "0.5rem"
  row-get: "1.15rem"
  row-item: "1.5rem"
  region: "clamp(3.5rem, 7vw, 6rem)"
  device: "18px 18px 24px"
components:
  entry:
    textColor: "{colors.dim}"
    typography: "{typography.entry}"
    rounded: "{rounded.none}"
    padding: "0.15rem 0"
  entry-hover:
    textColor: "{colors.paper}"
  entry-live:
    textColor: "{colors.paper}"
    typography: "{typography.entry}"
  entry-pending:
    textColor: "{colors.dim}"
  row:
    textColor: "{colors.mid}"
    typography: "{typography.listing}"
    rounded: "{rounded.none}"
    padding: "0.62rem 0"
  row-head:
    textColor: "{colors.dim}"
    typography: "{typography.label}"
    padding: "0.5rem 0"
  row-playing:
    textColor: "{colors.paper}"
    typography: "{typography.listing}"
    padding: "0.62rem 0"
  row-get:
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1.15rem 0"
  row-get-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
  device:
    backgroundColor: "{colors.device-face-hi}"
    rounded: "{rounded.device}"
    padding: "{spacing.device}"
    width: "min(300px, 100%)"
  device-screen:
    backgroundColor: "{colors.lcd-ground}"
    textColor: "{colors.lcd-text}"
    rounded: "{rounded.lcd}"
    padding: "8px 9px 7px"
  shot-slot:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.dim}"
    rounded: "{rounded.none}"
---

# Design System: waverr

## Overview

**Creative North Star: "The Directory Index"**

This is a file listing that happens to be a marketing page. Structure comes from a three-column grid, hairline rules and rows — name on the left, metadata right-aligned in a fixed column — and from nothing else. There is no card on this page, no panel, no rounded surface anywhere except the one object that is supposed to be an object. The page ground is near-black because the use scene is: a producer at their desk at night with the monitor the brightest thing in the room.

The palette is a deliberate monochrome — a near-black ground, a recessed ground one step up, four greys, and one ivory — carried over as a binding brand constraint from the application's own black/grey/white chassis. Against that, the white handheld player is the single light, curved, physical thing on the page. Its presence is the entire depth budget; everything else is drawn with one-pixel hairlines at value contrast only.

The build refuses the dark-hero-plus-feature-cards arrangement. Where a card would go, a `.row` goes. Where a floating pill CTA would go, a permanent entry in a listing header row goes. Sections are separated by a full-width hairline at the region boundary, not by a background change, and the two vertical column rules paint on the region itself so they run continuously down the whole page rather than restarting at every section.

**Key Characteristics:**
- Two composable primitives — a three-column index grid and a subgrid row — and no second layout system
- Two self-hosted monos with a load-bearing split: a pixel face for all chrome, a readable mono for running prose only
- Vertical column rules anchored to the listings they divide, and absent everywhere there are no columns
- One signal colour, used for the playing state, the download row's mark, and focus
- Flat by default: exactly one shadowed object on the page, and it is a depicted physical device

## Colors

A monochrome ramp from near-black to ivory, with one signal grey and a small green-tinted phosphor set confined to the depicted LCD.

### Primary
- **Signal Grey** (`{colors.live}`): The page's only signal colour. It marks the playing row, the leading square on the download row, the live underline on the download entry, and the focus ring. It appears in four places on the whole page and its rarity is the entire mechanism.

### Neutral
- **Night Ground** (`{colors.ink}`): The page background, and the base of the masthead's 88% translucent mix.
- **Recessed Ground** (`{colors.ink-2}`): The only background change on the page — the hover fill on download rows and the empty screenshot slot.
- **Hairline** (`{colors.rule}`): Every divider that is not a major boundary: row bottoms, the two vertical column rules, region tops, image slot borders, caption rules.
- **Metadata Grey** (`{colors.dim}`): The right-hand metadata and size columns, listing header labels, inactive entries, section labels, and the dimmed second line of a two-line heading.
- **Body Grey** (`{colors.mid}`): Running prose and non-playing row names. Chosen over metadata grey for anything read as a sentence — metadata grey clears 3:1 but not the 4.5:1 body floor.
- **Ivory** (`{colors.paper}`): Primary text, the device chassis, the two major boundary rules (masthead bottom, colophon top, listing header bottom), and the hover state of entries.

### Tertiary — The Screen
A backlit LCD reproducing the application's real Home menu. These values exist only inside the depicted device and never appear on the page around it.
- **LCD Ground** (`{colors.lcd-ground}` → `{colors.lcd-ground-mid}` → `{colors.lcd-ground-2}`): The screen's pale blue field, falling off down the panel.
- **LCD Text** (`{colors.lcd-text}`): The screen's base text colour.
- **LCD Row** (`{colors.lcd-dim}`): Unselected menu rows.
- **LCD Select** (`{colors.lcd-select}`): The selected row's fill, in the product's own selection blue, with `{colors.lcd-select-text}` on it. This is the one saturated hue in the entire build, and it is confined to a single row of a depicted screen.
- **LCD Chrome** (`{colors.lcd-chrome}`): The status bar and the battery cell outline.

### Named Rules
**The One Signal Rule.** Signal Grey marks state, never decoration. If a surface is not playing, not the primary download, and not focused, it does not get the signal colour.

**The Screen Containment Rule.** The LCD values — the blue field, the selection blue, the chrome greys — live inside `.device__*` and nowhere else. The page around the device stays strictly black, grey and white. Letting the selection blue out of the screen turns a depicted device into a brand colour the product does not have.

**The Prose Floor Rule.** Metadata grey is for metadata. Anything the visitor reads as a sentence — lede, notes, captions, caveats, fine print — takes Body Grey or lighter.

## Bands

The page alternates its ground rather than sitting on one value: dark for the masthead and the hero, paper for **why**, dark again for **what it does**, paper for **screens** and **get**. A band is a chapter, and the eye resets at each boundary.

This is implemented as **role tokens**, not as a second palette. Chrome reads `--ground`, `--recess`, `--hair`, `--meta-fg`, `--body-fg`, `--fg` and `--signal`; the `.band--lit` class repoints those seven at the light ramp and changes nothing else. No component rule is duplicated for the light band, and none may be.

Both bands stay strictly inside the black/grey/white brand constraint. The light band's metadata grey is `{colors.lit-dim}`, chosen because it clears the 4.5:1 body floor on the band ground (5.40:1) **and** on the recessed ground it sits over in hovered rows and empty slots (4.83:1) — a value that passes only one of those is a floor in name only.

The masthead floats over whichever band is beneath it, so a small script hands it that band's tokens as it crosses each boundary; its translucent mix and bottom rule would otherwise paint a near-black blur over paper.

### Named Rules
**The Role Token Rule.** A component reads role tokens, never a band's literals. A rule that hard-codes `--ink` or `--lit` cannot survive being placed in the other band, and every component on this page must be placeable in either.

**The Two-Ground Rule.** There are exactly two grounds. A third value — a "slightly lighter dark", a tinted panel — is drift, and the page has no card for it to live on anyway.

## Typography

**Display / Chrome Font:** Departure Mono (self-hosted woff2, ui-monospace fallback) — a pixel face drawn from early command-line screens.
**Body Font:** Geist Mono (self-hosted variable woff2, 100–900 axis, ui-monospace fallback).
**Label/Mono Font:** Departure Mono, same face as display.

**Character:** Two monospaced voices doing two different jobs. The pixel face is the world — it sets the listing, every heading, every label, and the device's LCD, and it carries the same character as the hardware being depicted. Geist Mono exists for one reason: pixel faces stop being readable past a sentence or two, and the paragraphs have to survive being read. Ligatures are disabled page-wide.

### Hierarchy
- **Display** (500, `clamp(1.75rem, 6vw, 3.4rem)`, 1.02, `-0.045em`): The page title only, set as a two-line listing entry — "Index of" over a dimmed path. The clamp is sized so the longest unbreakable word in the path fits its column at every width down to 320px; the line wraps, and the measure is never capped in `ch`, which cannot shrink below the viewport.
- **Headline** (500, `clamp(1.5rem, 3.2vw, 2.45rem)`, 1.16, `-0.035em`): Section leads, capped at 24ch so they break as statements rather than paragraphs.
- **Title** (500, 1.02rem, `-0.015em`): The bolded first line of a capability row, set as a block above its prose.
- **Listing** (400, 15px, 1.55): The document base — row names, the whole index. Truncated with an ellipsis on one line, except in prose rows where truncation is switched off.
- **Body** (400, `clamp(0.92rem, 1.1vw, 1.02rem)`, 1.7): Running prose in Geist Mono, capped at 54ch for the lede and 56–68ch elsewhere.
- **Meta** (400, 0.8rem, `0.02em`): The right-aligned folder and size columns, right-aligned and never wrapping.
- **Label** (400, 0.72rem, `0.14em`, uppercase): Listing header rows and comparison column headers.
- **Entry** (400, 0.78–0.82rem, `0.08em`, uppercase): Every link that acts as an action.
- **Wordmark** (500, 0.78–0.86rem, `0.2em`, uppercase): "waverr" in the masthead and colophon. The name is lowercase; the tracking does the work that capitals would.

### Named Rules
**The Two-Voice Rule.** The pixel face sets listing, headings, labels and LCD. Geist Mono sets running paragraphs and nothing else. A paragraph in the pixel face, or a label in the prose face, is a violation.

**The Inverse Tracking Rule.** Tracking tightens as size grows and loosens as size shrinks: display at `-0.045em`, headline at `-0.035em`, meta at `0.02em`, labels at `0.14em`, the wordmark at `0.2em`.

**The Product Voice Rule.** The application's own interface strings — ALL TRACKS, NOW PLAYING, QUEUE, SETTINGS, SAVE AS PLAYLIST — are set in caps verbatim, because that is how the product speaks. Nothing else on the page is upper-cased by hand; casing elsewhere comes from `text-transform` on labels and entries.

## Layout

Two primitives compose the entire page, and there is deliberately no third.

**`.idx` — the index grid.** A `1240px` max-width container, centred, with a fluid gutter (`clamp(1rem, 2.4vw, 2rem)`) as both inline padding and column gap. Three columns: a flexible name column, a fixed `13ch` metadata column, and a fixed `9ch` size column. Every region's content sits in one of these, including blocks that only use the first column.

**`.row` — the listing line.** Spans all three columns and inherits them via `grid-template-columns: subgrid`, with an `@supports not (subgrid)` fallback that restates the same track list literally. Baseline-aligned, `0.62rem` vertical padding, and a bottom hairline that is the page's only divider. Variants change padding and colour, never structure: header rows (`0.5rem`, ivory bottom rule, uppercase labels), prose rows (`1.5rem`, top-aligned, truncation off), download rows (`1.15rem`, larger name, hover fill), and a terminal "N more files" row with its bottom rule suppressed.

**Column rules.** Two vertical hairlines paint as background gradients on `.ruled` — the listings — rather than as borders, anchored from the listing's own right edge and inset by each column plus its gap, so they land exactly on the two internal gutters at every width. They are scoped to listings on purpose: painted on every `.region` they ran the full height of the page, through prose, headings, the device and empty space alike, and two lines traversing a whole page with nothing to separate read as an artifact rather than as structure. Anchoring them to the viewport instead of the listing is the other failure mode — measuring from `--page` or `100vw` puts them wherever the max-width cap and the scrollbar disagree.

**Vertical rhythm.** Regions carry `clamp(3.5rem, 7vw, 6rem)` block padding; the top region is the exception at zero, so the device bleeds to the masthead rule. Every region after the first opens with a full-width top hairline.

**First-viewport composition.** A sticky, translucent, blurred masthead with an ivory bottom rule; below it a two-column split (`1.08fr / 0.92fr`) with copy left and the device right; below that the ruled listing at full width.

**Responsive.** At `≤900px` the top split and the comparison both collapse to one column and the comparison's left hairline becomes a top hairline. At `≤680px` the metadata and size column widths are redefined to `auto`, every grid collapses to a single column, metadata drops beneath the name and left-aligns, header-row metadata is hidden, and the vertical column rules switch off entirely — there are no longer columns to divide. At `≤380px` only the nav gaps and entry size tighten.

### Named Rules
**The Two-Primitive Rule.** Every region composes from `.idx` and `.row`. New surfaces extend a variant of these; they do not introduce a second grid.

**The Real Column Rule.** A column rule marks a column that exists. It belongs to the listing whose tracks it divides, anchored to that listing's own edge — not to the region, and never to the viewport.

## Elevation & Depth

The page is flat. Depth is carried entirely by value contrast against the near-black ground and by one-pixel hairlines — there is no shadow, no gradient, and no layered surface anywhere in the page chrome. The single exception is the depicted player, and its shadows exist because it is meant to read as a physical object sitting in front of the page, not as a UI surface.

### Shadow Vocabulary
- **Device cast** (`box-shadow: 0 34px 70px rgba(0,0,0,.6), 0 8px 22px rgba(0,0,0,.4)`): Two stacked outer shadows — a wide ambient drop and a tighter contact shadow — on the handheld device only.
- **Wheel lift** (`box-shadow: 0 3px 8px rgba(0,0,0,.22)`) and **button lift** (`0 2px 5px rgba(0,0,0,.2)`): Contact shadows under the two raised parts, which is what proves the gap between them and the face.
- **Screen seat** (`box-shadow: 0 1px 2px rgba(0,0,0,.18), 0 0 0 3px rgba(0,0,0,.05)`): A tight drop plus a soft ring, seating the panel in its bezel.

The device is a real 3D solid, not a flat fill: `perspective` on the stage, `preserve-3d` on the chassis, and two genuine edge faces rotated into place, so the object has thickness and holds up when it turns. Depth is built OUTWARD from the face plane at Z=0 — the screen sits at `+3px`, the wheel at `+5px`, the button at `+4px` above that. Building it the other way (sinking parts to negative Z) puts them behind the chassis background, which paints over them and the screen disappears entirely.

### Named Rules
**The One Object Rule.** Exactly one element on the page casts a shadow, and it is the depicted device. Page chrome — masthead, listings, regions, images — is flat and separated by hairlines and value alone.

**The Real Geometry Rule.** The device's physicality comes from actual 3D transforms — rotated edge faces, Z-separated parts, contact shadows under each raised element — never from painted highlights or drawn bevels standing in for depth. A gradient on the chassis is legitimate only as the light falloff across a surface that genuinely turns.

## Shapes

The page is square. Every rectangle in the page chrome — image slots, rows, listings, the whole grid — has zero radius, and every boundary is a one-pixel solid hairline. Two-pixel borders, dotted or dashed strokes, and outlined containers do not appear.

Curvature is reserved for the depicted device and is its defining contrast: a `24px` chassis radius, a `5px` LCD radius, a fully circular `186px` click wheel with a concentric `70px` centre button. Transport marks are inline SVG paths drawn to the same pixel geometry as the face — no icon font, no glyph characters, no icon library.

The one recurring non-rectangular mark is the signal square: a `0.5rem`–`0.55rem` filled square in Signal Grey, absolutely positioned before the name of a playing row or the primary download row.

### Named Rules
**The Square Page Rule.** Radius on the page is zero. Curvature belongs to the device and to nothing else.

## Components

### Entries (the only action form)
An entry is a listing link, not a button. The page has no filled rectangle, no pill, and no bordered button anywhere.
- **Shape:** No radius, no fill, no border box — a transparent one-pixel bottom rule that becomes visible on approach.
- **Default:** Metadata grey, uppercase, `0.08em` tracking, `0.15rem` block padding.
- **Hover:** Text and bottom rule both go ivory, over a `140ms ease` transition on colour and border-colour.
- **Live variant:** Ivory text with a Signal Grey underline at rest; on hover the underline goes ivory. Used for the download link only — once in the masthead, once in the top actions.
- **Pending state:** While the repository and release constants still hold their placeholder, the script strips the `href`, sets `aria-disabled`, and the entry renders in metadata grey with no underline, `cursor: not-allowed`, and an appended " (soon)" via `::after`. This is a live shipped state, not a mock.
- **Focus:** A `1px` Signal Grey outline at `3px` offset, inherited from the page-wide `:focus-visible` rule.

### Listing Rows
The universal content container; this system's answer to a card.
- **Corner Style:** None. Rows are not boxes.
- **Border:** A single bottom hairline. No side or top borders.
- **Background:** None at rest. The download row is the only row that fills, taking Recessed Ground on hover over `140ms`.
- **Internal Padding:** Block only — `0.62rem` standard, `0.5rem` header, `1.15rem` download, `1.5rem` prose. There is no inline padding; the grid gutter does that work.
- **Playing state:** The name goes ivory with a `1.3rem` left inset and a filled Signal Grey square; the metadata columns lift from metadata grey to body grey.
- **Truncation:** Names truncate to one line with an ellipsis. Prose rows switch this off and cap at 68ch instead.

### Navigation
- **Style:** A sticky masthead, `46px` minimum height, background `color-mix(in srgb, ink 88%, transparent)` with a `6px` backdrop blur, and an ivory bottom rule. Wordmark left at `0.2em` tracking, entries right in a `1.6rem` flex row.
- **States:** Entries as above; download carries the live variant.
- **Mobile:** At `≤680px` the inner grid collapses to one column, the row gains `0.4rem` gap and `0.6rem` block padding, and the nav wraps at `0.9rem 1.1rem`.

### Image Slots
- **Style:** A fixed `16 / 10` box with a hairline border and Recessed Ground fill; the empty placeholder and a real `object-fit: cover` image share the same box so swapping one for the other never reflows.
- **Empty state:** A centred `0.7rem` uppercase label at `0.18em` tracking in metadata grey, naming the screen it is waiting for. Placeholders are labelled honestly; nothing here impersonates the running app.
- **Caption:** Above-rule caption at `0.78rem` in body grey, separated by a top hairline.

### The Device (signature component)
The one physical object, and the only element on the page rendered in 3D. A `min(300px, 100%)` chassis at `26px` radius, lit across its width and carrying two rotated edge faces (`11px` deep, `3px` radius) that give it real thickness. It rests at `rotateX(4deg) rotateY(-11deg)` — a settled three-quarter pose that reads as dimensional before any input and with JavaScript off.

It contains a `6px`-radius backlit LCD showing the application's real Home menu — status bar, battery cell, five menu rows with chevrons and one selected row in the product's selection blue, and a 28-bar visualizer — above a `168px` circular click wheel with a MENU label, three SVG transport marks and a concentric `66px` OK button.

**Motion.** The device turns to the pointer: `pointermove` drives `--rx`/`--ry` through a rAF-throttled handler, ±11° either side of rest, settling back on a `460ms` exponential ease-out when the pointer leaves. This is the page's one authored moment — the single physical object responds to the one thing the visitor is moving, and nothing else animates on approach. It is skipped entirely on coarse pointers (a tilt toward a finger that is covering the object means nothing) and under reduced motion, where the rest pose is pinned. The visualizer bars animate on an `820ms` alternating keyframe with per-bar randomized duration and negative delay, so the block reads as audio rather than as a loading indicator.

**Responsive.** At `≤680px` the chassis caps at `268px`, the wheel drops to `150px`, and the device squares up to face the viewer (`--rx`/`--ry` to zero, perspective off, depth to `7px`) — a three-quarter view has no room to read at that size, and the rotated footprint would otherwise crowd the column.

### Named Rules
**The No Button Rule.** Actions are entries in a listing. A filled or pilled button does not exist in this system; the primary action lives as a permanent row in the listing it belongs to.

## Do's and Don'ts

### Do:
- **Do** compose every new surface from `.idx` and a `.row` variant. Extending the row vocabulary is the only sanctioned way to add a pattern.
- **Do** anchor column rules to `.ruled` from its own right edge, so they mark real columns and stop where the listing stops.
- **Do** keep the two-voice split absolute: pixel face for listing, headings, labels and LCD; Geist Mono for running paragraphs.
- **Do** reserve Signal Grey for state — playing, primary download, focus — and let its rarity carry the meaning.
- **Do** use Body Grey or lighter for anything read as a sentence; metadata grey is for metadata only.
- **Do** cap prose measure (54ch lede, 56–68ch notes, 24ch headlines) and let names truncate with an ellipsis instead.
- **Do** honour `prefers-reduced-motion`: all animation and transition are disabled page-wide under it, and the script declines to seed inline durations.
- **Do** label unavailable states honestly — the pending link renders " (soon)" rather than a dead link, and placeholder image slots say what they are waiting for.
- **Do** set the product's own interface strings in caps verbatim, and the name in lowercase.

### Don't:
- **Don't** introduce a card, panel, tile, or any bordered container with a background fill. Where a card would go, a row goes.
- **Don't** add a filled or pilled button. Actions are entries with a hairline underline.
- **Don't** apply radius to page chrome. Curvature belongs to the device.
- **Don't** cast a shadow on anything other than the device. Page depth is value contrast and hairlines.
- **Don't** give the device plastic gradients, bevels, or simulated highlights — flat fills plus the two cast shadows.
- **Don't** let the LCD phosphor neutrals leak out of `.device__*` into page chrome.
- **Don't** add a second layout system, a private flex arrangement inside a listing, or a hue outside the monochrome ramp — the black/grey/white palette is a binding brand constraint matching the application's chassis.
- **Don't** introduce a border heavier than `1px`, or a dashed/dotted stroke.
