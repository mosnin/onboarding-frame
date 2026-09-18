import Link from "next/link";
import { shelves } from "@/lib/shelves";

const STEPS = [
  {
    n: 1,
    title: "Pick the pieces you want",
    body: "An onboarding flow. A dashboard. A pricing page. Take one of each or just the one you need — they don't know about each other.",
  },
  {
    n: 2,
    title: "Edit anything, or don't",
    body: "Every piece is a plain-object config. Change copy, colours, radius, typeface and steps in the playground, or ship the preset as-is.",
  },
  {
    n: 3,
    title: "Hand it to your agent",
    body: "Export one prompt carrying every config inline. Paste it into Claude Code, Cursor, ChatGPT — whatever builds your app.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 pb-28 sm:px-6">
      <section className="max-w-3xl">
        <h1 className="text-balance text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-[3.5rem]">
          Pick your onboarding. Pick your dashboard. Pick your pricing.
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-[color:var(--site-muted)]">
          A catalogue of production-grade SaaS UI you assemble yourself. Browse
          the shelves, put a kit together, tune it if you want to, then export a
          single prompt your coding agent can build from.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/shelf/onboarding"
            className="rounded-full bg-[color:var(--site-fg)] px-5 py-2.5 text-sm font-semibold text-[color:var(--site-bg)]"
          >
            Start browsing
          </Link>
          <Link
            href="/playground"
            className="rounded-full border border-[color:var(--site-border)] px-5 py-2.5 text-sm font-semibold"
          >
            Open the playground
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shelves.map((shelf) => (
          <Link
            key={shelf.id}
            href={`/shelf/${shelf.id}`}
            className="group flex flex-col rounded-xl border border-[color:var(--site-border)] p-6 transition-colors hover:bg-[color:var(--site-surface)]"
          >
            <span aria-hidden className="text-3xl">{shelf.glyph}</span>
            <h2 className="mt-4 text-lg font-bold">{shelf.name}</h2>
            <p className="mt-1.5 flex-1 text-[0.92rem] leading-relaxed text-[color:var(--site-muted)]">
              {shelf.tagline}
            </p>
            <p className="mt-4 text-[0.82rem] font-semibold text-[color:var(--site-muted)]">
              {shelf.items.length} to choose from →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-bold tracking-tight">How it works</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span className="grid size-8 place-items-center rounded-full bg-[color:var(--site-fg)] text-sm font-bold text-[color:var(--site-bg)]">
                {step.n}
              </span>
              <h3 className="mt-4 font-bold">{step.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-[color:var(--site-border)] p-8 sm:p-10">
        <h2 className="text-xl font-bold tracking-tight">
          Or install it and skip the agent
        </h2>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
          Everything here is one npm package. If you&apos;d rather write the code
          yourself, the configs drop straight in.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <code
            className="rounded-lg bg-[color:var(--site-surface)] px-4 py-2.5 text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            npm install onboarding-frame
          </code>
          <Link
            href="/docs"
            className="text-sm font-semibold text-[color:var(--site-accent)]"
          >
            Read the docs →
          </Link>
        </div>
      </section>
    </main>
  );
}
