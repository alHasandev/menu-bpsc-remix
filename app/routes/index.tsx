import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import MenuView from "~/components/item/menu";
import { getItems, type ItemWithCategory } from "~/models/item.server";

export const loader: LoaderFunction = async () => {
  return json<{ items: ItemWithCategory[] }>({
    items: await getItems(),
  });
};

export default function Index() {
  const { items } = useLoaderData<{ items: ItemWithCategory[] }>();

  return (
    <main className="relative min-h-screen bg-gray-50 py-4 px-4">
      <header className="container mx-auto mb-4">
        <h1>Menu BPSC</h1>
      </header>
      <article className="container mx-auto pb-16">
        <MenuView items={items} />
      </article>
    </main>
  );
}
