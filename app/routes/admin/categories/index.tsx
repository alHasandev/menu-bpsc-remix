import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "~/components/table";
import {
  deleteCategory,
  getCategories,
  type Category,
} from "~/models/category.server";

const columnHelper = createColumnHelper<Category>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Nama</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    id: "action",
    header: () => <div className="text-center">Aksi</div>,
    cell: (info) => (
      <div className="flex items-center justify-center gap-1 text-center">
        <Link
          to={info.row.original.id}
          className="inline-block rounded bg-blue-400 px-2 py-1 text-xs font-medium tracking-wider text-slate-50"
        >
          <PencilSquareIcon className="w-4" />
        </Link>
        <Form
          method="delete"
          onSubmit={(event) => {
            if (!confirm("Apakah anda yakin akan menghapus data ini?")) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={info.row.original.id} />
          <button className="inline-block rounded bg-slate-300 px-2 py-1 text-xs font-medium tracking-wider text-slate-50">
            <TrashIcon className="w-4 text-slate-500" />
          </button>
        </Form>
      </div>
    ),
  }),
];

type LoaderResponse = { categories: Category[] };

export const loader: LoaderFunction = async () => {
  return json<LoaderResponse>({
    categories: await getCategories(),
  });
};

export const action: ActionFunction = async ({ request }) => {
  console.log("request method", request.method);
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  if (request.method !== "DELETE" || !id) return null;

  const deleted = await deleteCategory({ id });
  return json({ data: deleted });
};

const AdminItems = () => {
  const data = useLoaderData<LoaderResponse>();

  return (
    <>
      <section className="">
        <Link
          to="new"
          className="inline-block rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold tracking-wide text-slate-50"
        >
          Tambah Kategori
        </Link>
      </section>
      <section>
        <Table data={data.categories} columns={columns} />
      </section>
    </>
  );
};

export default AdminItems;
