import type { OnboardingTheme, PatternKind } from "onboarding-frame";

const COMPONENTS: Record<PatternKind, string> = {
  wizard: "Wizard",
  checklist: "Checklist",
  tour: "Tour",
  "empty-state": "EmptyState",
  plans: "Plans",
  dashboard: "Dashboard",
};

export function componentNameFor(kind: PatternKind): string {
  return COMPONENTS[kind];
}

/** A copy-pasteable usage example for a pattern + variant. */
export function usageSnippet(
  kind: PatternKind,
  variant: string,
  theme?: OnboardingTheme,
): string {
  const component = COMPONENTS[kind];
  const themeLine = theme
    ? `\n      theme={${JSON.stringify(theme, null, 2).replace(/\n/g, "\n      ")}}`
    : "";

  return `import {
  OnboardingProvider,
  ${component},
  presets,
} from "onboarding-frame";
import "onboarding-frame/styles.css";

const { config, theme } = presets.${kind === "empty-state" ? '["empty-state"]' : kind}[${JSON.stringify(variant)}];

export function Onboarding() {
  return (
    <OnboardingProvider${themeLine ? "\n      theme={theme}" : ""}
      onEvent={(event) => analytics.track(event.name, event)}
    >
      <${component}
        config={config}
        onComplete={(values) => console.log("done", values)}
      />
    </OnboardingProvider>
  );
}`;
}

/**
 * The prompt the playground hands to a coding agent. It carries the full
 * config so the agent has no guesswork about the intended flow.
 */
export function agentPrompt(
  kind: PatternKind,
  variant: string,
  config: unknown,
  theme?: OnboardingTheme,
): string {
  const component = COMPONENTS[kind];
  return `Add this onboarding flow to my app.

Library: \`onboarding-frame\` (npm). Install it, import \`onboarding-frame/styles.css\`, and render the
\`${component}\` component inside an \`OnboardingProvider\`. It is a React 18+/19 component library that
expects Tailwind CSS v4; if the project uses Tailwind, add
\`@source "../node_modules/onboarding-frame/dist";\` to the stylesheet so the utility classes are detected.

Pattern: ${kind}
Variant: ${variant}

Use exactly this configuration:

\`\`\`json
${JSON.stringify(config, null, 2)}
\`\`\`

Theme:

\`\`\`json
${JSON.stringify(theme ?? {}, null, 2)}
\`\`\`

Requirements:
- Wire \`onEvent\` to the project's existing analytics client, mapping each event name through.
- Persist progress with the \`persistKey\` prop so a reload resumes where the person left off.
- On completion, save the collected values to the user's profile and route them to the app home.
- Keep the config in its own module so the copy can be edited without touching the component.
- Do not reimplement the UI; the library owns the layout and interaction.`;
}

/* ------------------------------------------------------------------ *
 * Kit export
 * ------------------------------------------------------------------ */

export interface KitPiece {
  shelf: string;
  name: string;
  kind: PatternKind;
  variant: string;
  config?: unknown;
  theme?: OnboardingTheme;
}

/**
 * The combined hand-off.
 *
 * One prompt describing every piece someone selected, with the exact configs
 * inline. An agent reading this has no guesswork left: which package, which
 * components, which props, and how the pieces relate.
 */
export function kitPrompt(pieces: KitPiece[], projectName = "my app"): string {
  if (pieces.length === 0) return "";

  const componentFor = (piece: KitPiece) =>
    piece.kind === "dashboard" && piece.shelf === "dashboard"
      ? `${toPascal(piece.variant)}Template`
      : COMPONENTS[piece.kind];

  const inventory = pieces
    .map((piece) => `- **${piece.shelf}**: ${piece.name} — \`<${componentFor(piece)} />\``)
    .join("\n");

  const sections = pieces
    .map((piece) => {
      const component = componentFor(piece);
      if (piece.kind === "dashboard" && piece.shelf === "dashboard") {
        return `### ${piece.name} (dashboard)

Render \`<${component} />\` from \`onboarding-frame\`. It is a full-page template
with its own design tokens, so do not wrap it in your app shell — it *is* the
shell. Every image, logo and avatar renders as a labelled dotted placeholder;
replace those with real assets, keeping the same dimensions.`;
      }
      return `### ${piece.name} (${piece.shelf})

\`\`\`tsx
import { OnboardingProvider, ${component} } from "onboarding-frame";
\`\`\`

Config:

\`\`\`json
${JSON.stringify(piece.config ?? {}, null, 2)}
\`\`\`

Theme:

\`\`\`json
${JSON.stringify(piece.theme ?? {}, null, 2)}
\`\`\``;
    })
    .join("\n\n");

  return `Build the UI for ${projectName} using the \`onboarding-frame\` package.

## Install

\`\`\`bash
npm install onboarding-frame
\`\`\`

It is a React 18+/19 component library styled with Tailwind CSS v4 and CSS
custom properties. In your stylesheet:

\`\`\`css
@import "tailwindcss";
@source "../node_modules/onboarding-frame/dist";
@import "onboarding-frame/styles.css";
\`\`\`

## What I picked

${inventory}

These are independent pieces — none of them import each other. Wire them into
routes as described below.

${sections}

## How to wire them together

1. Put the onboarding flow on a first-run route. Pass \`persistKey\` so a reload
   resumes where the person left off, and on \`onComplete\` save the collected
   values to the user's profile, then route to the dashboard.
2. Render the dashboard as the app's home route.
3. Put the pricing page behind an upgrade action, and wherever a usage limit is
   reached.
4. Mount any add-ons inside the dashboard route.
5. Wire \`onEvent\` on \`OnboardingProvider\` to the project's existing analytics
   client, mapping event names through. Do not add a new analytics vendor.

## Rules

- Do not reimplement these components. The library owns layout and interaction;
  the configs above own copy and content.
- Keep each config in its own module so copy can be edited without touching
  components.
- Theming is CSS custom properties written by \`OnboardingProvider\`. Change
  \`theme\`, not component internals.
- The checkout fields in pricing templates are inert demo placeholders. Replace
  them with your payment processor's hosted fields before taking real payments.`;
}

function toPascal(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
