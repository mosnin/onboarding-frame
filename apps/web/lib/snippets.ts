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
