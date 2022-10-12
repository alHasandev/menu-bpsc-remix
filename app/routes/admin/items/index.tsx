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
  deleteItem,
  getItems,
  type ItemWithCategory,
} from "~/models/item.server";
import { rupiah } from "~/utils/currency";

const columnHelper = createColumnHelper<ItemWithCategory>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Item</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.category, {
    id: "category",
    cell: (info) => <i>{info.getValue().name}</i>,
    header: () => <span>Kategori</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("purchase", {
    header: () => <div className="text-right">Harga Beli</div>,
    cell: (info) => (
      <div className="text-right italic">{rupiah(info.getValue())}</div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price", {
    header: () => <div className="text-right">Harga Jual</div>,
    cell: (info) => (
      <div className="text-right italic">{rupiah(info.getValue())}</div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("stock", {
    header: () => <div className="text-center">Stok</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
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

export const loader: LoaderFunction = async () => {
  return json<{ items: ItemWithCategory[] }>({
    items: await getItems(),
  });
};

export const action: ActionFunction = async ({ request }) => {
  console.log("request method", request.method);
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  if (request.method !== "DELETE" || !id) return null;

  const deleted = await deleteItem({ id });
  return json({ data: deleted });
};

const AdminItems = () => {
  const data = useLoaderData<{ items: ItemWithCategory[] }>();

  return (
    <>
      <section className="">
        <Link
          to="new"
          className="inline-block rounded-md border bg-blue-500 px-4 py-2 text-sm font-semibold tracking-wide text-slate-50"
        >
          Tambah Item
        </Link>
      </section>
      <section>
        <Table data={data.items} columns={columns} />
      </section>
    </>
  );
};

export default AdminItems;
