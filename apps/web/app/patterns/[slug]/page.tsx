import { notFound } from "next/navigation";
import Link from "next/link";
import { presets } from "onboarding-frame";
import { catalog, getPattern } from "@/lib/catalog";
import { PatternExplorer } from "@/components/pattern-explorer";

export function generateStaticParams() {
  return catalog.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  return { title: pattern?.name ?? "Pattern" };
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  // Presets are plain data, so they serialise straight into the client explorer.
  const group = presets[pattern.kind] as Record<string, unknown>;
  const resolved: Record<string, { config: unknown; theme?: unknown }> = {};
  for (const variant of pattern.variants) {
    const entry = group?.[variant.id];
    resolved[variant.id] =
      entry && typeof entry === "object" && "config" in entry
        ? (entry as { config: unknown; theme?: unknown })
        : { config: entry };
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        <nav className="grid content-start gap-1">
          <p className="px-3 pb-1 text-[0.72rem] font-bold uppercase tracking-wide text-[color:var(--site-muted)]">
            Patterns
          </p>
          {catalog.map((entry) => (
            <Link
              key={entry.slug}
              href={`/patterns/${entry.slug}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                entry.slug === slug
                  ? "bg-[color:var(--site-surface)] text-[color:var(--site-fg)]"
                  : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
              }`}
            >
              {entry.name}
            </Link>
          ))}
        </nav>

        <div className="min-w-0">
          <header className="mb-8">
            <h1 className="text-[2rem] font-extrabold tracking-tight">
              {pattern.name}
            </h1>
            <p className="mt-2 max-w-3xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
              {pattern.description}
            </p>
          </header>

          <PatternExplorer
            pattern={pattern}
            presets={
              resolved as Record<string, { config: unknown; theme?: never }>
            }
          />
        </div>
      </div>
    </main>
  );
}
