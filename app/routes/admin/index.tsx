import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import { getItems, type ItemWithCategory } from "~/models/item.server";
import ItemList from "~/components/item/list";

export const loader: LoaderFunction = async () => {
  return json<{ items: ItemWithCategory[] }>({
    items: await getItems(),
  });
};

export default function AdminIndex() {
  const data = useLoaderData<{ items: ItemWithCategory[] }>();

  return (
    <>
      <header className="container mx-auto mb-4">
        <h1>Menu BPSC</h1>
      </header>
      <article className="container mx-auto pb-16">
        <ItemList items={data.items} />
      </article>
    </>
  );
}
