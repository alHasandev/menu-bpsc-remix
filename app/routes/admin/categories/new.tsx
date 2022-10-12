import { Form, Link } from "@remix-run/react";
import { type ActionFunction, json, redirect } from "@remix-run/server-runtime";
import { createCategory } from "~/models/category.server";

type ActionData =
  | {
      name: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");

  const errors: ActionData = {
    name: name ? null : "Nama Kategori is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  await createCategory({
    name: String(name),
  });

  return redirect("/admin/categories");
};

const NewCategoryForm = () => {
  return (
    <Form method="post">
      <header className="mb-4 flex items-center justify-between font-semibold tracking-wide">
        <h3>Tambah Kategori</h3>
        <Link
          to="/admin/categories"
          className="inline-block rounded-md bg-slate-300 px-4 py-2 text-sm text-slate-700"
        >
          Kembali
        </Link>
      </header>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="name">Nama Kategori</label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-md border px-4 py-2 outline-none ring-offset-white focus:ring-2 focus:ring-offset-1"
            placeholder="Masukkan nama item"
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

export default NewCategoryForm;
