import { useState } from "react";
import { rupiah } from "~/utils/currency";
import CartDisplay, { initialCardSum } from "./cart";
import type { CartItem, CartSum, Item } from "./types";

type ItemListProps = {
  items: Item[];
};

const incrementChartItem = (
  cartItems: CartItem[],
  item: Item,
  increment: number
) => {
  const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
  const matchItem = cartItems.find((cartItem) => {
    return cartItem.id === item.id;
  });

  const quantity = matchItem?.quantity ? matchItem.quantity + increment : 1;

  newCartItems.unshift({
    ...item,
    stock: item.stock - increment,
    quantity: quantity,
  });

  return newCartItems;
};

export const ItemList = ({ items }: ItemListProps) => {
  const [cartItems, cartItemsSet] = useState<CartItem[]>([]);
  const [cartSum, cartSumSet] = useState<CartSum>(initialCardSum);
  const [filteredItems, filteredItemsSet] = useState<Item[]>(items);

  const addCartItem = (item: Item) => {
    cartItemsSet((cartItems) => {
      return incrementChartItem(cartItems, item, 1);
    });

    cartSumSet((sum) => ({
      totalItem: sum.totalItem + 1,
      totalPrice: sum.totalPrice + Number(item.price),
    }));

    filteredItemsSet((items) => {
      return items.map((itm) => {
        if (itm.id !== item.id) return itm;

        return {
          ...itm,
          stock: itm.stock - 1,
        };
      });
    });
  };

  const removeCartItem = (item: CartItem) => {
    cartSumSet((sum) => ({
      totalItem: sum.totalItem - 1,
      totalPrice: sum.totalPrice - Number(item.price),
    }));

    filteredItemsSet((items) => {
      return items.map((itm) => {
        if (itm.id !== item.id) return itm;

        return {
          ...itm,
          stock: itm.stock + 1,
        };
      });
    });

    if (item.quantity === 1) {
      return cartItemsSet((cartItems) =>
        cartItems.filter((cartItem) => cartItem.id !== item.id)
      );
    }

    cartItemsSet((cartItems) => {
      return incrementChartItem(cartItems, item, -1);
    });
  };

  return (
    <>
      <ul className="flex flex-col gap-4 text-sm">
        {filteredItems.map((item) => (
          <li key={item.id}>
            <button
              className="flex w-full items-center gap-2 rounded-full border bg-slate-50 py-1 pl-4 pr-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-gray-500 sm:pl-6"
              onClick={() => addCartItem(item)}
              disabled={Number(item.stock) === 0}
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
      <CartDisplay
        sum={cartSum}
        items={cartItems}
        onClickItem={removeCartItem}
      />
    </>
  );
};

export default ItemList;
