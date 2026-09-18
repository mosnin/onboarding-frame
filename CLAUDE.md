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

- Icons come from a maintained icon library. Two are installed, and the
  reference decides which:
  - **`lucide-react`** — outline icons on a 24px grid. The default.
  - **`@phosphor-icons/react`** — the same coverage in six weights, including
    `fill`, `bold` and `duotone`.

  Match the **weight the reference draws**, not just the shape. Many of these
  products use a filled icon set; rendering those as thin outlines is the
  single loudest way a recreation reads as "not close", and no amount of
  correct spacing hides it. Copilot Money's rail is solid, so it is Phosphor
  at `fill`; a product drawing hairline outlines is Lucide. Check by cropping
  the reference's icons and enlarging them before choosing.
- Do not hand-roll an icon set, and do not hand-draw individual SVG paths for
  an icon. Composing two library icons (a filled circle with a library glyph
  knocked out of it) is fine; drawing the glyph yourself is not. This applies
  to the site chrome in `apps/web` exactly as it applies to the library.
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

### 3. Fill the slot; an empty grey box is not a placeholder

A screen with six empty grey circles where the reference has faces and logos
reads as broken, not as a deliberate convention. It is the single loudest
difference between a recreation and its reference, and it was in almost every
template. Four cases, and only the last of them is dotted:

- **Real icon** — every UI affordance: search, chevron, close, settings, bell,
  trash. Lucide or Phosphor, per rule 1.
- **Brand and platform marks** — LinkedIn, Facebook, Stripe, Slack. These come
  from **`simple-icons`**, which carries 3,400 of them as path data. That is
  what the real product uses, and it is what the reference shows. A few are
  absent because the owner asked to be removed (LinkedIn is one); those fall
  back to a labelled tile — never draw someone's logo by hand.
- **Avatars and photographs** — `Avatar` and `Thumb` in `ui/avatar.tsx`
  generate a stable field from a seed string: initials on a colour, which is
  what these products render for an account with no picture, and a soft
  two-tone field for a photo. They fill the slot at the right size without
  shipping anyone's asset, and they do not change between screenshots.
- **`Placeholder`** — only when the point of the slot is that something is
  *missing*: an empty state, an unconfigured integration, a failed upload.

Using a placeholder where the reference has an ordinary icon is as wrong as
using an emoji. Using one where the reference has a face or a logo is what
made the catalogue look unfinished.

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

### 6b. A measurement window that clips is worse than no measurement

Measuring a heading means choosing an x-window, and a window that cuts the
text short returns a smaller number with no sign that anything went wrong.
It has produced two corrections in the wrong direction: modeling-home's
greeting measured 99px against the reference's 105 and was rescaled to match,
when the window had caught six characters of a line that was actually **1.5x
too large**; banking-ledger's read 86 for the same reason.

So: choose the window wider than the text can possibly be, check that the run
does not touch either edge, and compare **px per character** when the two
strings differ in length — "Welcome to Causal, Jane!" against "Welcome to
Acme, Jane!" is two characters shorter and will measure shorter at the same
size.

And not every difference is a uniform scale error. modeling-home's nav, cards
and body all matched while its heading alone was half again too big; a
whole-file rescale would have broken three correct things to fix one.

### 6a. Weight is measured, not eyeballed

Type that is one weight step too heavy reads as wrong even when the size and
the face are right. Compare ink: sum `255 - luminance` over the same text box
in both images. Within about 5% is a match; +15% means drop a step.

A build shipped with every bold one step heavy — 600 where the reference set
500, 700 where it set 600 — while every measured width matched exactly.
Widths matching is not the same as the type matching.

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
- [ ] Icons come from Lucide or Phosphor, at the reference's size, stroke
      **and weight** — filled where the reference is filled
- [ ] Imagery is a labelled placeholder at the reference's dimensions
- [ ] Typeface is this template's own, matched to the reference
- [ ] Reflows at 390px with nothing clipped

## The audit

`pnpm audit:fidelity` scans every template's source for banned glyphs and
reports the count per file, worst first. It is the worklist: a template is not
done while it appears there, unless the characters are ones its own reference
genuinely prints (Canny's heading really does carry a party popper).

`pnpm audit:scale` compares each template's rendered capture against its
reference and reports the scale factor between them, so the error that has
been in almost every template — everything off by one uniform multiple, which
reads as "a bit roomy" rather than as wrong — is found without measuring a
heading by hand. It needs the normalised images in `.audit/refs1512` and
`.audit/shots1512`. Read the confidence before acting: a template whose rail
and main pane were built at different scales has no single factor, and one
with few vertical rules gives a sharp peak on a weak fit. Both are marked
inconclusive and mean: measure that one by hand.

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
