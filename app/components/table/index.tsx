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
    <table className="w-full border-collapse border text-sm">
      <thead className="sticky top-0">
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="h-8 px-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
