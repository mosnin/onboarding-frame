import Link from "next/link";
import { templateCatalog } from "onboarding-frame";
import { shelves } from "@/lib/shelves";
import { TemplatePreview } from "@/components/template-preview";
import { ArrowUpRight } from "@/components/icons";

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

/** A spread across the range, so the strip shows light, dark and dense at once. */
const FEATURED = ["crm-workspace", "market-terminal", "wealth-portfolio"];

export default function HomePage() {
  const featured = FEATURED.map((slug) =>
    templateCatalog.find((entry) => entry.slug === slug),
  ).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const total = shelves.reduce((count, shelf) => count + shelf.items.length, 0);

  return (
    <main className="mx-auto max-w-[1700px] px-4 pb-24 pt-16 sm:px-6">
      <section className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--site-border)] px-4 py-1.5 text-[0.88rem] font-medium text-[color:var(--site-muted)]">
          {total} pieces · {templateCatalog.length} dashboard templates
        </span>
        <h1 className="mt-6 text-balance text-[3rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[4rem]">
          Pick your onboarding.
          <br />
          Pick your dashboard.
          <br />
          Pick your pricing.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.15rem] leading-relaxed text-[color:var(--site-muted)]">
          A catalogue of production-grade SaaS UI you assemble yourself. Browse the
          shelves, put a kit together, tune it if you want to, then export a single
          prompt your coding agent can build from.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/templates"
            className="rounded-xl bg-[color:var(--site-fg)] px-6 py-3.5 text-[1rem] font-semibold text-[color:var(--site-bg)] transition-opacity hover:opacity-90"
          >
            Browse templates
          </Link>
          <Link
            href="/playground"
            className="rounded-xl border border-[color:var(--site-border)] px-6 py-3.5 text-[1rem] font-semibold transition-colors hover:bg-[color:var(--site-surface)]"
          >
            Open the playground
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {featured.map((entry) => (
          <Link
            key={entry.slug}
            href={`/templates/${entry.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--site-border)] transition-shadow hover:shadow-[var(--site-shadow-lift)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "var(--site-glow)" }}
            />
            <div className="relative p-3">
              <TemplatePreview slug={entry.slug} page={entry.pages[0]?.id ?? "home"} />
            </div>
            <div className="relative flex items-start gap-3 px-5 pb-5">
              <span className="flex-1">
                <span className="block text-[1.12rem] font-bold tracking-tight">
                  {entry.name}
                </span>
                <span className="mt-1.5 line-clamp-2 block text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
                  {entry.blurb}
                </span>
              </span>
              <ArrowUpRight className="mt-1 shrink-0 text-[color:var(--site-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shelves.map((shelf) => (
          <Link
            key={shelf.id}
            href={`/shelf/${shelf.id}`}
            className="group flex flex-col rounded-2xl border border-[color:var(--site-border)] p-6 transition-colors hover:bg-[color:var(--site-surface)]"
          >
            <span aria-hidden className="text-[1.75rem]">
              {shelf.glyph}
            </span>
            <h2 className="mt-4 text-[1.25rem] font-bold tracking-tight">
              {shelf.name}
            </h2>
            <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
              {shelf.tagline}
            </p>
            <p className="mt-5 flex items-center gap-1.5 text-[0.9rem] font-semibold text-[color:var(--site-muted)]">
              {shelf.items.length} to choose from
              <ArrowUpRight size={14} />
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-24">
        <h2 className="text-[1.9rem] font-bold tracking-[-0.02em]">How it works</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span className="grid size-9 place-items-center rounded-full bg-[color:var(--site-fg)] text-[0.95rem] font-bold text-[color:var(--site-bg)]">
                {step.n}
              </span>
              <h3 className="mt-5 text-[1.12rem] font-bold">{step.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-[color:var(--site-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-6 rounded-2xl border border-[color:var(--site-border)] p-8 sm:p-10 lg:grid-cols-2">
        <div>
          <h2 className="text-[1.45rem] font-bold tracking-[-0.01em]">
            Install it as a package
          </h2>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
            Everything here is one npm package. If you&apos;d rather write the code
            yourself, the configs drop straight in.
          </p>
          <code
            className="mt-5 inline-block rounded-xl bg-[color:var(--site-surface)] px-4 py-3 text-[0.95rem]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            npm install onboarding-frame
          </code>
        </div>

        <div className="lg:border-l lg:border-[color:var(--site-border)] lg:pl-10">
          <h2 className="text-[1.45rem] font-bold tracking-[-0.01em]">
            Or own the source
          </h2>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
            Copy any piece into your repo. The registry serves the package&apos;s own
            files, so an ejected component cannot drift from the published one.
          </p>
          <code
            className="mt-5 inline-block rounded-xl bg-[color:var(--site-surface)] px-4 py-3 text-[0.95rem]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            npx onboarding-frame add crm-workspace
          </code>
        </div>
      </section>
    </main>
  );
}
