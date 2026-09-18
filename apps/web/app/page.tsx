import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { templateCatalog } from "onboarding-frame";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-[color:var(--site-accent)]">
          onboarding-frame
        </p>
        <h1 className="mt-3 text-balance text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-[3.5rem]">
          SaaS onboarding flows as a UI library.
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-[color:var(--site-muted)]">
          Setup wizards, checklists, product tours, empty states, paywalls and the
          activation dashboards they land in. Every flow is a plain-object config,
          so you can tune it in the playground, copy it, and drop it into a product
          unchanged.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/patterns/wizard"
            className="rounded-full bg-[color:var(--site-fg)] px-5 py-2.5 text-sm font-semibold text-[color:var(--site-bg)]"
          >
            Browse patterns
          </Link>
          <Link
            href="/playground"
            className="rounded-full border border-[color:var(--site-border)] px-5 py-2.5 text-sm font-semibold"
          >
            Open the playground
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-bold tracking-tight">Patterns</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((entry) => (
            <Link
              key={entry.slug}
              href={`/patterns/${entry.slug}`}
              className="group rounded-xl border border-[color:var(--site-border)] p-5 transition-colors hover:bg-[color:var(--site-surface)]"
            >
              <span aria-hidden className="text-2xl">{entry.glyph}</span>
              <h3 className="mt-3 font-bold">{entry.name}</h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[color:var(--site-muted)]">
                {entry.tagline}
              </p>
              <p className="mt-3 text-[0.82rem] font-semibold text-[color:var(--site-muted)]">
                {entry.variants.length} variants
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end gap-4">
          <h2 className="flex-1 text-xl font-bold tracking-tight">Dashboard templates</h2>
          <Link href="/templates" className="text-sm font-semibold text-[color:var(--site-accent)]">
            See all
          </Link>
        </div>
        <p className="mt-2 max-w-2xl text-[0.95rem] text-[color:var(--site-muted)]">
          Full-page recreations of real product surfaces. Each carries its own
          palette, radius and type scale, and every image or logo is a labelled
          placeholder so you know exactly what to supply.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templateCatalog.map((entry) => (
            <Link
              key={entry.slug}
              href={`/templates/${entry.slug}`}
              className="rounded-xl border border-[color:var(--site-border)] p-5 transition-colors hover:bg-[color:var(--site-surface)]"
            >
              <h3 className="font-bold">{entry.name}</h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[color:var(--site-muted)]">
                {entry.blurb}
              </p>
              <p className="mt-3 text-[0.82rem] font-semibold text-[color:var(--site-muted)]">
                {entry.pages.length} page{entry.pages.length === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
