import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

export function Table<TData>({
  data,
  columns,
}: {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse text-sm sm:border">
      <thead className="sticky top-0 hidden sm:table-row-group">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="h-8 px-3 text-left font-semibold tracking-wide"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="flex flex-col gap-4 sm:table-row-group">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="flex flex-col border py-2 sm:table-row">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="flex h-8 items-center px-3 sm:table-cell"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
