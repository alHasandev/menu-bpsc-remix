import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  type ActionFunction,
  json,
  redirect,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import {
  type Category,
  getCategory,
  updateCategory,
} from "~/models/category.server";

type LoaderResponse = { category: Category };
export const loader: LoaderFunction = async ({ params }) => {
  const category = await getCategory({ id: params.id || "" });
  if (category === null) return redirect("/admin/categories");

  return json<LoaderResponse>({
    category,
  });
};

type ActionData =
  | {
      name: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request, params }) => {
  const id = params.id;
  if (!id) return redirect("/admin/categories");

  const formData = await request.formData();

  const name = formData.get("name");

  const errors: ActionData = {
    name: name ? null : "Nama Kategori is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  await updateCategory({
    id,
    name: String(name),
  });

  return redirect("/admin/categories");
};

const EditItemForm = () => {
  const { category } = useLoaderData<LoaderResponse>();

  return (
    <Form method="patch">
      <header className="mb-4 flex items-center justify-between font-semibold tracking-wide">
        <h3>Edit Item</h3>
        <Link
          to="/admin/categories"
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
            placeholder="Masukkan nama kategori"
            defaultValue={category.name}
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
          Update
        </button>
      </section>
    </Form>
  );
};

export default EditItemForm;
