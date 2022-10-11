import { rupiah } from "~/utils/currency";
import { type ItemWithCategory } from "~/models/item.server";

type ItemListProps = {
  items: ItemWithCategory[];
  onClickItem?: (item: ItemWithCategory) => void;
};

export const ItemList = ({ items, onClickItem }: ItemListProps) => {
  return (
    <ul className="flex flex-col gap-4 text-sm" data-cy="menu-list">
      {items.map((item) => (
        <li key={item.id}>
          <button
            className="flex w-full items-center gap-2 rounded-full border bg-slate-50 py-1 pl-4 pr-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-gray-500 sm:pl-6"
            name={`menu-item-${item.id}`}
            onClick={() => onClickItem?.(item)}
            disabled={Number(item.stock) <= 0}
          >
            <span className="">{item.name}</span>
            <span className="ml-auto">{rupiah(item.price)}</span>
            <span className="flex aspect-square w-10 items-center justify-center rounded-full border">
              {item.stock}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
