import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata = { title: "Docs" };

const INSTALL = `# npm
npm install onboarding-frame

# pnpm
pnpm add onboarding-frame

# bun
bun add onboarding-frame`;

const USAGE = `import { OnboardingProvider, Wizard, presets } from "onboarding-frame";
import "onboarding-frame/styles.css";

const { config, theme } = presets.wizard["warm-survey"];

export function Onboarding() {
  return (
    <OnboardingProvider
      theme={theme}
      onEvent={(event) => analytics.track(event.name, event)}
    >
      <Wizard
        config={config}
        persistKey="signup"
        onComplete={(values) => saveProfile(values)}
      />
    </OnboardingProvider>
  );
}`;

const TAILWIND = `@import "tailwindcss";

/* Let Tailwind see the utility classes inside the package. */
@source "../node_modules/onboarding-frame/dist";

@import "onboarding-frame/styles.css";`;

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-[2.25rem] font-extrabold tracking-tight">
        Getting started
      </h1>
      <p className="mt-3 text-pretty leading-relaxed text-[color:var(--site-muted)]">
        Every pattern takes a plain-object config. Author it in the{" "}
        <Link
          href="/playground"
          className="font-semibold text-[color:var(--site-accent)]"
        >
          playground
        </Link>
        , copy the JSON, and render it — the component owns the layout and
        interaction, you own the content.
      </p>

      <section className="mt-10 grid gap-4">
        <h2 className="text-xl font-bold tracking-tight">Install</h2>
        <CodeBlock
          code={INSTALL}
          language="bash"
          title="Install"
          maxHeight="14rem"
        />
      </section>

      <section className="mt-10 grid gap-4">
        <h2 className="text-xl font-bold tracking-tight">Tailwind setup</h2>
        <p className="text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
          The library is styled with Tailwind v4 utilities and CSS custom
          properties. Point Tailwind at the package so its classes are detected,
          then import the token stylesheet.
        </p>
        <CodeBlock
          code={TAILWIND}
          language="css"
          title="app.css"
          maxHeight="14rem"
        />
      </section>

      <section className="mt-10 grid gap-4">
        <h2 className="text-xl font-bold tracking-tight">Render a flow</h2>
        <CodeBlock code={USAGE} title="onboarding.tsx" />
      </section>

      <section className="mt-10 grid gap-4">
        <h2 className="text-xl font-bold tracking-tight">Theming</h2>
        <p className="text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
          <code className="rounded bg-[color:var(--site-surface)] px-1.5 py-0.5">
            OnboardingProvider
          </code>{" "}
          writes CSS custom properties, so brand colour, radius, density and
          typeface are all runtime-configurable. Nothing is baked into the
          components.
        </p>
      </section>

      <section className="mt-10 grid gap-4">
        <h2 className="text-xl font-bold tracking-tight">Analytics</h2>
        <p className="text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
          Every flow emits events — <code>flow_started</code>,{" "}
          <code>step_viewed</code>, <code>step_completed</code>,{" "}
          <code>plan_selected</code> and more — through a single{" "}
          <code>onEvent</code> sink. Watch them live on any pattern page under
          the Events tab.
        </p>
      </section>
    </main>
  );
}
