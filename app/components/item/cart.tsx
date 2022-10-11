import React, { useMemo, useState } from "react";
import type { ItemWithCategory } from "~/models/item.server";
import { rupiah } from "~/utils/currency";
// import type { CartItem, CartSum } from "./types";

export type CartItem = ItemWithCategory & {
  quantity: number;
};

export type CartSum = {
  totalPrice: number;
  totalItem: number;
};

export const initialCardSum = Object.create({
  totalPrice: 0,
  totalItem: 0,
}) as CartSum;

interface CartDisplayProps {
  items: CartItem[];
  onClickItem?: (cartItem: CartItem) => void;
}

export const incrementChartItem = (
  cartItems: CartItem[],
  item: ItemWithCategory,
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

const CartDisplay = ({ items, onClickItem }: CartDisplayProps) => {
  const [showDetail, showDetailSet] = useState(false);

  const cartSum = useMemo(() => {
    console.log("items", items);
    return items.reduce(
      (acc, curr) => {
        acc.totalItem += curr.quantity;
        acc.totalPrice += curr.price * curr.quantity;
        return acc;
      },
      { totalPrice: 0, totalItem: 0 }
    );
  }, [items]);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-20 z-10 transition duration-300 ${
          !showDetail ? "pointer-events-none translate-y-full opacity-0" : ""
        }`}
      >
        <ul
          className={`container mx-auto max-h-60 overflow-y-auto rounded-3xl border bg-white shadow-lg ${
            cartSum.totalItem === 0 ? "pointer-events-none invisible" : ""
          } ${!showDetail ? "" : ""}`}
          data-cy="cart-list"
        >
          {items.map((cartItem) => (
            <li key={cartItem.id} className="">
              <button
                className="flex w-full items-center gap-2 rounded-full py-1 pl-4 pr-1 hover:bg-slate-100 sm:pl-6"
                name={`chart-item-${cartItem.id}`}
                onClick={() => onClickItem?.(cartItem)}
              >
                <span className="">{cartItem.name}</span>
                <span className="ml-auto">{rupiah(cartItem.price)}</span>
                <span className="flex aspect-square w-10 items-center justify-center rounded-full border">
                  {cartItem.quantity}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <section className="fixed inset-x-0 bottom-0 isolate flex flex-col gap-2 overflow-hidden py-2 px-2 text-sm sm:py-4">
        <div className="container relative z-20 mx-auto" data-cy="cart-toggle">
          <button
            className="flex w-full items-center gap-2 rounded-3xl border bg-white py-1 pl-4 pr-1 shadow-lg hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-gray-500 sm:pl-6"
            disabled={cartSum.totalItem === 0}
            onClick={() => showDetailSet((show) => !show)}
          >
            <span className="font-bold">Total</span>
            <span className="ml-auto">{rupiah(cartSum.totalPrice)}</span>
            <span className="flex aspect-square w-10 items-center justify-center rounded-full border">
              {cartSum.totalItem}
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default CartDisplay;
