import { notFound } from "next/navigation";
import Link from "next/link";
import { getShelf, shelves } from "@/lib/shelves";
import { ShelfGrid } from "@/components/shelf-grid";

export function generateStaticParams() {
  return shelves.map((shelf) => ({ id: shelf.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: getShelf(id)?.name ?? "Shelf" };
}

export default async function ShelfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shelf = getShelf(id);
  if (!shelf) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 pb-28 sm:px-6">
      <nav className="mb-8 flex flex-wrap gap-2">
        {shelves.map((entry) => (
          <Link
            key={entry.id}
            href={`/shelf/${entry.id}`}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              entry.id === shelf.id
                ? "bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                : "border border-[color:var(--site-border)] text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
            }`}
          >
            <span aria-hidden className="mr-1.5">{entry.glyph}</span>
            {entry.name}
          </Link>
        ))}
      </nav>

      <header className="max-w-3xl">
        <h1 className="text-[2.25rem] font-extrabold tracking-tight">{shelf.name}</h1>
        <p className="mt-2 text-lg text-[color:var(--site-muted)]">{shelf.tagline}</p>
        <p className="mt-3 text-pretty leading-relaxed text-[color:var(--site-muted)]">
          {shelf.description}
        </p>
        {shelf.multiple && (
          <p className="mt-3 text-[0.9rem] font-semibold text-[color:var(--site-accent)]">
            You can pick as many of these as you like.
          </p>
        )}
      </header>

      <div className="mt-10">
        {shelf.items.length > 0 ? (
          <ShelfGrid shelf={shelf} />
        ) : (
          <p className="rounded-xl border border-dashed border-[color:var(--site-border)] p-10 text-center text-[color:var(--site-muted)]">
            Nothing on this shelf yet.
          </p>
        )}
      </div>
    </main>
  );
}
