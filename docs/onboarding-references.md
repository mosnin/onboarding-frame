# Reference -> surface map: onboarding and pricing

`.audit/refs1512/` holds the images, normalised to the 1512px width the
screenshots were taken at. Files 000-056 are the onboarding and pricing
references; 057-108 are the dashboards and live in `dashboard-references.md`.

These 57 references had no map at all until now, and `pnpm audit:fidelity`
was pointed only at `patterns/dashboard/templates`, so it reported zero while
158 banned glyph sites sat in the presets and patterns these rows cover. The
rules in `CLAUDE.md` apply here exactly as they do to a dashboard: measured,
one at a time, against its own reference.

**State column**, same meaning as the dashboard ledger:

- `UNVERIFIED` — built, never compared to this reference. The starting state
  for every row below.
- `REMEASURED` — pixel-measured against this reference, captured at 1512px,
  diffed side by side until the list was empty, and checked at 390px.

Only `REMEASURED` rows are done.

## A note on what these surfaces are

The dashboards are 1:1 recreations of one screen each. These are not: the five
wizards and seven pricing surfaces are config-driven components, so a preset
carries the reference's *content* while the component carries its layout. The
fidelity bar is the same — this reference's type scale, spacing, palette and
icons — but it is met by the preset and the component together, and a row is
only done when the rendered preset matches the shot.

## Onboarding

| # | ref | product | screen | preset / component | state |
|---|-----|---------|--------|--------------------|-------|
| 1 | 004 | Koj | "How do you want me to sound?" — voice picker, toggle | `fullscreenQuiz` / `Wizard` | UNVERIFIED |
| 2 | 005 | Koj | "What level of programming are you at?" — four code cards | `fullscreenQuiz` / `Wizard` | UNVERIFIED |
| 3 | 007 | Buffer | Welcome — "Hey there {name}", drifting platform marks | `warmSurvey` / `Wizard` | UNVERIFIED |
| 4 | 008 | Buffer | "What tools do you use?" — six checkbox cards, first ticked | `warmSurvey` / `Wizard` | UNVERIFIED |
| 5 | 009 | Buffer | Same step, nothing selected, CTA disabled | `warmSurvey` / `Wizard` | UNVERIFIED |
| 6 | 010 | Buffer | "How would you describe yourself?" — seven options, one picked | `warmSurvey` / `Wizard` | UNVERIFIED |
| 7 | 011 | Buffer | Same step, unselected state | `warmSurvey` / `Wizard` | UNVERIFIED |
| 8 | 012 | Buffer | "How many social accounts?" — six ranges, none picked | `warmSurvey` / `Wizard` | UNVERIFIED |
| 9 | 013 | Buffer | "What social channel(s) are in focus?" — 11 brand marks | `warmSurvey` / `Wizard` | UNVERIFIED |
| 10 | 014 | Buffer | Same step, unselected | `warmSurvey` / `Wizard` | UNVERIFIED |
| 11 | 015 | Buffer | Accounts step with a range selected | `warmSurvey` / `Wizard` | UNVERIFIED |
| 12 | 016 | Buffer | "Thanks for choosing Buffer" — spinner interstitial | `warmSurvey` / `Wizard` | UNVERIFIED |
| 13 | 017 | Buffer | "Here's what you can do" — four-item rail, blue plate | `featureWalkthrough` / `Tour` | UNVERIFIED |
| 14 | 018 | Buffer | Same, second item active, amber plate | `featureWalkthrough` / `Tour` | UNVERIFIED |
| 15 | 019 | Copilot Money | "First, add an extra layer of security" — 2FA, skip link | `splitRail` / `Wizard` | UNVERIFIED |
| 16 | 020 | Copilot Money | "Transaction types" — Regular tab, illustrated right pane | `splitRail` / `Wizard` | UNVERIFIED |
| 17 | 021 | Copilot Money | "Link accounts" — one cash account, net-worth pane | `splitRail` / `Wizard` | UNVERIFIED |
| 18 | 022 | Copilot Money | "Link accounts" — 12 bank marks, zeroed net worth | `splitRail` / `Wizard` | UNVERIFIED |
| 19 | 023 | Copilot Money | 2FA step, complete state with a green tick | `splitRail` / `Wizard` | UNVERIFIED |
| 20 | 024 | Copilot Money | "Transaction types" — Internal tab | `splitRail` / `Wizard` | UNVERIFIED |
| 21 | 025 | Copilot Money | "How did you hear about us?" — nine stacked options | `splitRail` / `Wizard` | UNVERIFIED |
| 22 | 026 | Copilot Money | "Review your finances" — four review cards | `splitRail` / `Wizard` | UNVERIFIED |
| 23 | 027 | Copilot Money | "Start your free trial" — plan, Google Pay, reviews rail | `trialTimeline` / `Plans` | UNVERIFIED |
| 24 | 028 | Copilot Money | Hear-about-us with the first option selected | `splitRail` / `Wizard` | UNVERIFIED |
| 25 | 029 | Higgsfield | "How do you plan to use Higgsfield?" — two cards, 1 of 5 | `neonQuiz` / `Wizard` | UNVERIFIED |
| 26 | 030 | Higgsfield | "What do you want to create?" — eleven tiles, 2 of 5 | `neonQuiz` / `Wizard` | UNVERIFIED |
| 27 | 031 | Higgsfield | "How experienced are you with AI?" — four levels | `neonQuiz` / `Wizard` | UNVERIFIED |
| 28 | 032 | Higgsfield | Same, nothing selected | `neonQuiz` / `Wizard` | UNVERIFIED |
| 29 | 033 | Higgsfield | Use-case step with the first card ticked | `neonQuiz` / `Wizard` | UNVERIFIED |
| 30 | 034 | Higgsfield | Create step, two tiles ticked, lime CTA enabled | `neonQuiz` / `Wizard` | UNVERIFIED |
| 31 | 036 | Higgsfield | "Last question. What frustrates you most" — photo right half | `neonQuiz` / `Wizard` | UNVERIFIED |
| 32 | 037 | Higgsfield | "How did you hear about us?" — ten marks, photo pane | `neonQuiz` / `Wizard` | UNVERIFIED |
| 33 | 038 | Higgsfield | Same, one option ticked | `neonQuiz` / `Wizard` | UNVERIFIED |
| 34 | 040 | SchoolAI | "Hi Alex, I'm Dot." — orb, single arrow, change-my-name | `conversational` / `Wizard` | UNVERIFIED |
| 35 | 041 | SchoolAI | "Tell me about yourself." — ten role chips | `conversational` / `Wizard` | UNVERIFIED |
| 36 | 042 | SchoolAI | "What's your name?" — filled field, Save enabled | `conversational` / `Wizard` | UNVERIFIED |
| 37 | 043 | SchoolAI | Same, empty field, Save disabled | `conversational` / `Wizard` | UNVERIFIED |
| 38 | 044 | SchoolAI | Role chips with "Teacher" selected | `conversational` / `Wizard` | UNVERIFIED |
| 39 | 045 | SchoolAI | "Which school are you with?" — search field | `conversational` / `Wizard` | UNVERIFIED |
| 40 | 046 | SchoolAI | "What grades do you teach?" — 15 chips, four selected | `conversational` / `Wizard` | UNVERIFIED |
| 41 | 047 | SchoolAI | Same, none selected | `conversational` / `Wizard` | UNVERIFIED |
| 42 | 048 | SchoolAI | School step with school and city filled | `conversational` / `Wizard` | UNVERIFIED |
| 43 | 049 | SchoolAI | Same, city empty | `conversational` / `Wizard` | UNVERIFIED |
| 44 | 050 | SchoolAI | "What subjects do you teach?" — 13 chips, none picked | `conversational` / `Wizard` | UNVERIFIED |
| 45 | 051 | SchoolAI | "Choose your look" — five portraits, first selected | `conversational` / `Wizard` | UNVERIFIED |
| 46 | 052 | SchoolAI | Same, five illustrated avatars, none selected | `conversational` / `Wizard` | UNVERIFIED |
| 47 | 053 | SchoolAI | "Add your phone number." — consent checkbox, no-thanks | `conversational` / `Wizard` | UNVERIFIED |
| 48 | 054 | SchoolAI | Subjects with Math and Science selected | `conversational` / `Wizard` | UNVERIFIED |
| 49 | 055 | SchoolAI | Choose-your-look with the last portrait ringed | `conversational` / `Wizard` | UNVERIFIED |
| 50 | 056 | SchoolAI | "Does everything look correct?" — summary card, Edit | `conversational` / `Wizard` | UNVERIFIED |

## Pricing

| # | ref | product | screen | preset / component | state |
|---|-----|---------|--------|--------------------|-------|
| 51 | 000 | Brilliant | Checkout — benefits left, PayPal/GPay/card right | `spotlightSequence` / `Plans` | UNVERIFIED |
| 52 | 001 | Brilliant | Same checkout, full height, Stripe footer | `spotlightSequence` / `Plans` | UNVERIFIED |
| 53 | 002 | Brilliant | "Unlock the full Brilliant experience" — three tiers | `quietTiers` / `Plans` | UNVERIFIED |
| 54 | 003 | Brilliant | "Level up your learning with Premium" — Free/Premium table | `comparisonTable` / `Plans` | UNVERIFIED |
| 55 | 006 | Devin | Pro / Max / Teams — three columns, per-tier tick lists | `quietTiers` / `Plans` | UNVERIFIED |
| 56 | 035 | Higgsfield | "Maximize Your Generations" — model x tier quota matrix | `quotaMatrix` / `Plans` | UNVERIFIED |
| 57 | 039 | Higgsfield | "You're in 5% who received..." — discount modal, countdown | `offerModal` / `Plans` | UNVERIFIED |

## Emoji the references genuinely print

Rule 1 bans emoji as icons; it does not ban reproducing an emoji the reference
itself sets as text. Two rows here do:

- 007 — Buffer's welcome line ends in a waving hand.
- 016 — Buffer's "Thanks for choosing Buffer" ends in a seedling.

Everything else currently in these files is a defect. `scripts/audit-allow.json`
records the exceptions per file.
