import { getRegistryItem, registryItemNames } from "../../../lib/registry";

/**
 * One JSON document per registry item, prerendered at build time.
 *
 * Static rather than dynamic so the registry works on any static host and
 * cannot fall out of sync with the deployed docs: the files it serves were
 * read from the package during the same build.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const names = await registryItemNames();
  return names.map((name) => ({ name: `${name}.json` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const item = await getRegistryItem(name.replace(/\.json$/, ""));

  if (!item) {
    return Response.json({ error: `Unknown registry item: ${name}` }, { status: 404 });
  }

  return Response.json(item);
}
