import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import ItemList from "~/components/item/list";
import type { Item } from "~/components/item/types";
import { getItems } from "~/utils/google/sheet";

export const loader: LoaderFunction = async () => {
  return json<{ items: Item[] }>({
    items: await getItems(),
  });
};

export default function Index() {
  const { items } = useLoaderData<{ items: Item[] }>();

  return (
    <main className="relative min-h-screen bg-gray-50 py-4 px-4">
      <header className="container mx-auto mb-4">
        <h1>Menu BPSC</h1>
      </header>
      <article className="container mx-auto pb-16">
        <ItemList items={items} />
      </article>
    </main>
  );
}
