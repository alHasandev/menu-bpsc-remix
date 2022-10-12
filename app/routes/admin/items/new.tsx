import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  redirect,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import { type Category, getCategories } from "~/models/category.server";
import { createItem } from "~/models/item.server";

export const loader: LoaderFunction = async () => {
  return json<{ categories: Category[] }>({
    categories: await getCategories(),
  });
};

type ActionData =
  | {
      name: null | string;
      categoryId: null | string;
      purchase: null | string;
      price: null | string;
      stock: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const categoryId = formData.get("categoryId");
  const purchase = formData.get("purchase");
  const price = formData.get("price");
  const stock = formData.get("stock");

  const errors: ActionData = {
    name: name ? null : "Nama Item is required",
    categoryId: categoryId ? null : "Kategori is required",
    purchase: purchase ? null : "Harga Beli is required",
    price: price ? null : "Harga Jual is required",
    stock: stock ? null : "Stok is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  await createItem({
    name: String(name),
    purchase: Number(purchase),
    price: Number(price),
    stock: Number(stock),
    categoryId: String(categoryId),
  });

  return redirect("/admin/items");
};

const NewItemForm = () => {
  const { categories } = useLoaderData<{ categories: Category[] }>();

  return (
    <Form method="post">
      <header className="mb-4 flex items-center justify-between font-semibold tracking-wide">
        <h3>Tambah Item</h3>
        <Link
          to="/admin/items"
          className="inline-block rounded-md bg-slate-300 px-4 py-2 text-sm text-slate-700"
        >
          Kembali
        </Link>
      </header>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="name">Nama Item</label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-md border px-4 py-2 outline-none ring-offset-white focus:ring-2 focus:ring-offset-1"
            placeholder="Masukkan nama item"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="categoryId">Kategori</label>
          <select
            id="categoryId"
            name="categoryId"
            className="rounded-md border px-4 py-2 outline-none ring-offset-white focus:ring-2 focus:ring-offset-1"
          >
            <option value="" disabled selected>
              Pilih kategori
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="purchase">Harga Beli (Rp)</label>
          <input
            type="number"
            id="purchase"
            name="purchase"
            className="rounded-md border px-4 py-2 outline-none ring-offset-white focus:ring-2 focus:ring-offset-1"
            placeholder="Tanpa rupiah (Rp) atau titik (.)"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="price">Harga Jual (Rp)</label>
          <input
            type="number"
            id="price"
            name="price"
            className="rounded-md border px-4 py-2 outline-none ring-offset-white focus:ring-2 focus:ring-offset-1"
            placeholder="Tanpa rupiah (Rp) atau titik (.)"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="price">Stok Awal</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="rounded-md border px-4 py-2 outline-none ring-offset-white focus:ring-2 focus:ring-offset-1"
            placeholder="Jumlah stok awal"
          />
        </div>
      </section>

      <section className="mt-4 flex justify-end gap-4 font-semibold tracking-wide">
        <button
          type="reset"
          className="inline-block rounded-md bg-slate-300 px-4 py-2 text-sm text-slate-700"
        >
          Reset
        </button>
        <button
          type="submit"
          className="inline-block rounded-md bg-blue-500 px-4 py-2 text-sm text-slate-50"
        >
          Simpan
        </button>
      </section>
    </Form>
  );
};

export default NewItemForm;
