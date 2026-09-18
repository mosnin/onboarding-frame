import { getRegistryItem, registryItemNames } from "../../lib/registry";

/** The index: every item's name, title and description, without the source. */
export const dynamic = "force-static";

export async function GET() {
  const names = await registryItemNames();
  const items = await Promise.all(names.map((name) => getRegistryItem(name)));

  return Response.json({
    items: items.filter((item) => item !== null).map((item) => ({
      name: item.name,
      title: item.title,
      description: item.description,
      registryDependencies: item.registryDependencies,
      files: item.files.length,
    })),
  });
}
