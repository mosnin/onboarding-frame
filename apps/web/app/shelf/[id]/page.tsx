import { notFound } from "next/navigation";
import { getShelf, shelves } from "@/lib/shelves";
import { ShelfBrowser } from "@/components/shelf-browser";

export function generateStaticParams() {
  return shelves.map((shelf) => ({ id: shelf.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shelf = getShelf(id);
  return { title: shelf?.name ?? "Shelf", description: shelf?.tagline };
}

export default async function ShelfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shelf = getShelf(id);
  if (!shelf) notFound();

  return <ShelfBrowser shelf={shelf} />;
}
