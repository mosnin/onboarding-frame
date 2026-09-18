import { notFound } from "next/navigation";
import { templateCatalog } from "onboarding-frame";
import { TemplateViewerShell } from "@/components/template-viewer-shell";

export function generateStaticParams() {
  return templateCatalog.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = templateCatalog.find((item) => item.slug === slug);
  return { title: entry?.name ?? "Template", description: entry?.blurb };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!templateCatalog.some((entry) => entry.slug === slug)) notFound();

  return <TemplateViewerShell slug={slug} />;
}
