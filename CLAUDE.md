# Working rules for this repository

This repo is a catalogue of **1:1 recreations** of real product UI. Each
template exists to reproduce one reference screenshot exactly. "Close enough"
is failure — the whole value is fidelity.

The rules below were written after a build that violated every one of them.
They are not style preferences. Breaking one means the work is wrong.

---

## BANNED — these caused the rebuild

### 1. No emoji or Unicode pictographs, ever

A previous build used 199 distinct glyphs across 988 sites as icons: 🥑 for
"Groceries", 🦄 for "Other", 👻 for "No data", ▦ for a nav item, ⚙ for
settings. They render in whatever font the OS supplies, so weight, size and
baseline vary per machine and none of it resembles the reference.

- Icons come from **`lucide-react`**. Nothing else.
- Do not hand-roll an icon set, and do not hand-draw individual SVG paths for
  an icon. A maintained library already exists and the reference products'
  icons look like it. This applies to the site chrome in `apps/web` exactly as
  it applies to the library.
- Drawing inline SVG is only acceptable for data visualisation (charts,
  sparklines) and for the dotted placeholder slots — things no icon set ships.
- Do not put emoji in body copy as decoration ("Can't wait 🧁",
  "Getting started 🚀"). If the reference has no emoji there, neither do we.
- The only acceptable literal characters are ones the reference itself shows
  as text: `⌘K` in a shortcut chip, `/` in a breadcrumb, currency symbols.

### 2. Never invent content the reference does not have

No decorative flourishes, no made-up badges, no filler emoji, no "friendly"
copy that isn't in the screenshot. If the reference shows an awkward state —
a row reading "Not specified · 100%", a chart flat at zero — reproduce it.
Inventing plausible content removes exactly what the screen is for.

### 3. Placeholders are for imagery, not icons

- **Placeholder**: photos, artwork, brand logos, avatars, integration marks,
  thumbnails — anything that is someone's copyrighted asset. Dotted, labelled,
  correctly sized.
- **Real icon**: every UI affordance — search, chevron, close, settings, bell,
  trash. These are generic and Lucide has them.

Using a placeholder where the reference has an ordinary icon is as wrong as
using an emoji.

### 4. No global find-and-replace across templates

Every batch pass across all templates has made things worse and broken the
build. Templates are individually measured recreations, not instances of a
shared theme. A change that is correct for one is usually wrong for the next.

Work **one template at a time**, against **its own** reference image.

### 5. Never mark a template done without a side-by-side comparison

Building it and running `tsc` is not verification. A template is done only
when its rendered screenshot has been put next to its reference image and
the differences enumerated and closed.

`docs/dashboard-references.md` maps every reference to its template. A row
does not say DONE until that comparison happened.

### 6. Templates must not share one typeface

Every template carries its own face in `tokens.tsx`. A previous build pointed
all 41 at one `GEOMETRIC` constant, so every recreation rendered in Inter —
the loudest possible signal that they came off one template. Pick the free
face whose width, terminals and set match the reference.

### 7. Responsive means reflow, never clip

`overflow-x-hidden` on a container that is too narrow **hides** content; it
does not adapt. At 390px a table must scroll or restructure, a rail must
collapse to something reachable, and nothing may be cut mid-character.

Check every template at 390px before calling it done.

---

## The required method, per template

1. Open the reference image. Read `docs/dashboard-references.md` for its
   prose description.
2. **Measure**: type sizes, row heights, control widths, gaps, radii, border
   and fill colours. Write the numbers into the component, not approximations.
3. Build.
4. Screenshot the rendered template.
5. Put the two side by side and list every difference.
6. Close them. Repeat 4–5 until the list is empty.
7. Check 390px.
8. Only then, mark it done.

## Fidelity checklist

- [ ] Same sections, same order, same nesting
- [ ] Type scale matches — measured, not guessed
- [ ] Control dimensions match (button heights, pill widths, input heights)
- [ ] Spacing and gaps match
- [ ] Palette matches, including subtle fills and border colours
- [ ] Icons are Lucide, at the reference's size and stroke
- [ ] Imagery is a labelled placeholder at the reference's dimensions
- [ ] Typeface is this template's own, matched to the reference
- [ ] Reflows at 390px with nothing clipped

## The audit

`pnpm audit:fidelity` scans every template's source for banned glyphs and
reports the count per file, worst first. It is the worklist: a template is not
done while it appears there, unless the characters are ones its own reference
genuinely prints (Canny's heading really does carry a party popper).

`pnpm capture:templates` renders every template at 1512px — the width the
reference screenshots were taken at — so measurements compare directly without
rescaling. With captures present, the audit also reports layout boundaries in
both images side by side.

Run the audit before claiming any template is finished.

## Conventions

- pnpm workspace. `pnpm typecheck` and `pnpm build` must pass.
- `pnpm check:registry` must pass: every template ejects standalone, so a
  template may not import from a sibling template. Shared types live in
  `props.ts`, shared chrome in `chrome.tsx`.
- Templates take a plain-object config; layout lives in the component.
