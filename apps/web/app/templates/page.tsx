import Link from "next/link";
import { templateCatalog } from "onboarding-frame";

export const metadata = { title: "Dashboard templates" };

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-[2.25rem] font-extrabold tracking-tight">
          Dashboard templates
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-[color:var(--site-muted)]">
          Full-page recreations of real product surfaces. Each template carries its
          own palette, radius and type scale rather than a shared house style, and
          every image, logo and avatar renders as a labelled dotted placeholder so
          it is obvious what you need to supply.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templateCatalog.map((entry) => (
          <Link
            key={entry.slug}
            href={`/templates/${entry.slug}`}
            className="rounded-xl border border-[color:var(--site-border)] p-5 transition-colors hover:bg-[color:var(--site-surface)]"
          >
            <h2 className="font-bold">{entry.name}</h2>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[color:var(--site-muted)]">
              {entry.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {entry.pages.map((page) => (
                <span
                  key={page.id}
                  className="rounded-full bg-[color:var(--site-surface)] px-2.5 py-1 text-[0.72rem] font-semibold text-[color:var(--site-muted)]"
                >
                  {page.label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
