# onboarding-frame

A UI library of SaaS onboarding flows — setup wizards, checklists, product
tours, empty states, paywalls, and the activation dashboards those flows land
in. Every flow is a plain-object config, so you can tune it in the playground,
copy the JSON, and render it in a product unchanged.

```bash
npm install onboarding-frame   # or: pnpm add · bun add
```

## Why config-driven

A flow's layout and interaction are the hard parts, and they barely change
between products. The copy, the questions, the branching and the branding
change constantly. So the components own the former and your config owns the
latter:

```tsx
import { OnboardingProvider, Wizard, presets } from "onboarding-frame";
import "onboarding-frame/styles.css";

const { config, theme } = presets.wizard["warm-survey"];

export function Onboarding() {
  return (
    <OnboardingProvider theme={theme} onEvent={(e) => analytics.track(e.name, e)}>
      <Wizard config={config} persistKey="signup" onComplete={saveProfile} />
    </OnboardingProvider>
  );
}
```

The same object you edit in the playground is the object you pass here.

## Patterns

| Pattern | Variants |
| --- | --- |
| **Setup wizard** | fullscreen quiz · neon quiz · warm survey · guided split rail · conversational |
| **Checklist** | dashboard card · launcher popover · sidebar panel · top banner |
| **Product tour** | spotlight · beacon · modal sequence · feature walkthrough |
| **Empty state** | illustration · ghost preview · sample data |
| **Plans & paywall** | spotlight sequence · quiet tiers · trial timeline · quota matrix · offer modal · comparison table · usage slider |
| **Dashboard** | activation home · metrics overview · workspace hub · usage & billing |

The wizard ships 15 field kinds — choice cards, poster tiles, list rows, icon
grids, chip sentences, avatar pickers, segmented panels, logo grids, consent
blocks and more — plus branching (`skipSteps`), validation gating, and step
kinds for welcome, interstitial, review and confirm screens.

## Dashboard templates

Beyond the config-driven patterns, the library ships **full-page dashboard
templates**: 1:1 recreations of real product surfaces you can fork.

Two things make them useful rather than decorative:

- **Each template owns its design tokens.** Palette, radius, type scale and
  surface treatment are bound per template, so two templates built from the
  same components render as two different products instead of converging on one
  house style.
- **Every image is a labelled placeholder.** Logos, avatars, thumbnails and
  hero art render as dotted, hatched slots naming what belongs there. The layout
  reserves the correct space, and nothing pretends to be real content.

Templates are multi-page where the reference product is: `<ApiConsoleTemplate
page="usage" />` renders a usage breakdown composed for that product, not a
generic filler page.

## Owning the source

Everything here works as an ordinary import. It is also ejectable: the docs site
publishes a registry generated from this package's own files, and the CLI copies
them into your project.

```bash
npx onboarding-frame list                     # every item
npx onboarding-frame add crm-workspace        # a dashboard template
npx onboarding-frame add wizard/neon-quiz     # a pattern, starting from a preset
```

Files land in `components/onboarding` by default (`--dir` to change it), shared
dependencies are copied once however many items you add, and existing files are
left alone unless you pass `--overwrite`. `--dry-run` prints the plan.

The registry serves the package's real source rather than a second copy of it,
so an ejected component cannot drift from the published one. CI checks that every
item ejects into a tree with no dangling imports — a template importing a file
the registry does not ship would build fine in this repo and break only for
someone running `add`, so that case is verified rather than assumed.

## Theming

`OnboardingProvider` writes CSS custom properties, so everything is
runtime-configurable:

```tsx
<OnboardingProvider
  theme={{
    scheme: "dark",
    brand: "#ccff00",
    radius: "0.9rem",
    density: 1.1,
    fontFamily: '"Inter Variable", system-ui, sans-serif',
    canvas: { kind: "mesh", stops: ["#2b2350", "#3a2d1c", "#121212"] },
  }}
/>
```

## Analytics

Every flow emits events through one sink — `flow_started`, `step_viewed`,
`step_completed`, `step_skipped`, `field_changed`, `task_completed`,
`plan_selected`, `checkout_submitted` and more. Wire `onEvent` to your existing
client; no vendor is assumed.

## Tailwind

The library uses Tailwind v4 utilities plus CSS custom properties. Point
Tailwind at the package so its classes are detected:

```css
@import "tailwindcss";
@source "../node_modules/onboarding-frame/dist";
@import "onboarding-frame/styles.css";
```

## Repository layout

```
packages/onboarding-frame   the publishable library
apps/web                    docs site, pattern explorer and playground
```

```bash
pnpm install
pnpm dev          # docs site at localhost:3000
pnpm typecheck    # library + app
pnpm build        # production build of the site
pnpm build:pkg    # bundle the library for publishing
```

## A note on the payment screens

The paywall templates include checkout layouts. Their inputs are inert and
labelled as a demo — they collect nothing. Swap in your processor's hosted
fields before using any of it for real, and replace the generic wallet labels
with that provider's own buttons.

## License

MIT
