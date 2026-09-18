import { notFound } from "next/navigation";
import Link from "next/link";
import { templateCatalog } from "onboarding-frame";
import { TemplateViewer } from "@/components/template-viewer";

export function generateStaticParams() {
  return templateCatalog.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = templateCatalog.find((t) => t.slug === slug);
  return { title: entry?.name ?? "Template" };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = templateCatalog.find((t) => t.slug === slug);
  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <header className="mb-6">
        <Link
          href="/templates"
          className="text-sm font-semibold text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
        >
          ← All templates
        </Link>
        <h1 className="mt-3 text-[2rem] font-extrabold tracking-tight">{entry.name}</h1>
        <p className="mt-2 max-w-3xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
          {entry.blurb}
        </p>
      </header>

      <TemplateViewer slug={entry.slug} pages={entry.pages} />
    </main>
  );
}
