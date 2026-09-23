# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS, no framework and no build step. Chosen by the user
after being offered framework alternatives. Deploy target is Vercel as a
static project (zero config), which the user set as a requirement before
design began.

## Users

Music producers — people who record, sketch, and mix their own material.
They are working at their own machine, inside their own project folders,
during or right after a session. The job they are doing is finding and
playing back a specific take among hundreds of untitled ones: comparing
versions, replaying a loop, re-listening to last night's idea.

Secondary audience: visitors arriving cold from a GitHub link, a Reddit
thread, or a Discord post, who have never heard of the product and are
deciding in a few seconds whether it is for them.

## Product Purpose

waverr is a local audio player for a library that has no metadata. It
indexes chosen folders on disk and plays their audio through an on-screen
device with an LCD, a click wheel, and a visualizer.

It exists because ordinary players assume a clean tagged library, and a
producer's disk is the opposite of that: `beat_v3.wav`,
`demo_final_FINAL.wav`, `idea_140bpm.wav`, scattered across dozens of
project folders with no tags at all.

Success for the website specifically: a visitor understands what the app
is within one viewport, and clicks either Download or View on GitHub.

## Positioning

The mechanism a neighboring product could not truthfully copy: waverr
indexes the filesystem rather than a tag library, searches path and
filename substrings via an SQLite FTS5 trigram index, and presents the
result as a single flat list rather than a folder tree — then wraps all of
it in a literal reproduction of a classic click-wheel MP3 player.

The combination is the position: a filesystem-first index for untagged
audio, driven by a hardware metaphor rather than a library UI.

## Operating Context

- Runs as an Electron desktop application on Windows.
- Points at one or more root folders the user adds via `SETTINGS → + ADD FOLDER`.
- Scans in two passes: paths first, so search works within seconds, then
  tags and duration.
- Driven entirely by keyboard or entirely by mouse. Arrows or wheel-scroll
  move the selection; `Enter` opens or plays; held `Enter` or right-click
  opens a row's context menu; `Esc` goes back; letters and digits open
  search and filter live; `F` toggles favorite; `V` changes visualizer mode.
- `ALL TRACKS` is every indexed audio file in one flat list, sorted by
  folder then A–Z within it, with the folder shown on every row. There is
  no folder browsing.
- The queue holds what is playing, what was queued by hand, and what
  follows from context; a hand-queued track survives choosing another track
  to play. `SAVE AS PLAYLIST` converts a queue into a playlist.

## Capabilities and Constraints

- Indexed formats: `.mp3 .wav .flac .m4a .aac .ogg .opus .aiff .aif .wma`.
- Playback verified against real files for MP3, WAV, M4A and OGG. Chromium
  decodes FLAC natively but this has not been tried with an actual file.
  **Chromium does not play AIFF** — those files are indexed and searchable
  but will not play.
- Search uses an FTS5 trigram tokenizer, matching substrings anywhere:
  `bpm` matches `loop_140bpm.wav`. Queries of one or two characters fall
  back to `LIKE %x%`.
- Measured over 5,000 files: scan ~1 s, slowest search 4 ms. These are the
  only performance numbers that exist; no others may be stated.
- A file that disappears from disk is marked missing rather than removed,
  and keeps its favorites.
- Distribution is a Windows NSIS installer built with `npm run build:win`.
  No macOS or Linux build exists, so the site must not advertise either.
- The public GitHub repository exists; **no release has been published yet**,
  so the download link points at the repository's releases page rather than
  a direct installer asset.
- Repository URL is not yet supplied. It ships as a named placeholder
  constant and must be filled before launch. The same applies to the
  release URL.
- License is unknown at the time of writing and must not be stated on the
  site until confirmed.

## Brand Commitments

- Name is lowercase: **waverr**.
- Palette is restricted to black, grey and white, matching the application's
  own chassis. This was a binding constraint from the user's first message.
- The product's own interface language — `ALL TRACKS`, `NOW PLAYING`,
  `QUEUE`, `SETTINGS`, `SAVE AS PLAYLIST` — is set in caps and is part of
  how the product speaks.
- UI strings, comments and copy are in English.

## Evidence on Hand

- The application's own README, which is the source of every factual claim
  above.
- **No screenshots have been supplied yet.** The user intends to add real
  application screenshots later; until then the site must show clearly
  labeled placeholders and must not fabricate imagery purporting to be the
  running app.
- No testimonials, user counts, download counts, press coverage, reviews, or
  customer names exist. None may be invented.
- No logo file exists beyond the wordmark.

## Product Principles

1. **The filename is the truth.** The product never asks the user to tag,
   rename, or organize anything; it adapts to the mess that already exists.
2. **The device is the interface.** Interaction is modeled on a physical
   object, not on a file manager — this is the product's identity, not
   decoration.
3. **Nothing leaves the machine.** No account, no cloud, no library service.
   Local files, local index.
4. **Losing a drive is not losing your work.** State about a file outlives
   the file's presence on disk.
5. **Claim only what is measured.** The product's public material states the
   numbers that were actually measured and nothing beyond them.

## Accessibility & Inclusion

No product-specific standard has been established by the user. For the
website, motion must honor `prefers-reduced-motion`, and the page must
remain readable and navigable without JavaScript — both carried over from
the approved site spec.
