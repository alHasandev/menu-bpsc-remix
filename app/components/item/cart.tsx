import React, { useState } from "react";
import { rupiah } from "~/utils/currency";
import type { CartItem, CartSum } from "./types";

export const initialCardSum = Object.create({
  totalPrice: 0,
  totalItem: 0,
}) as CartSum;

interface CartDisplayProps {
  sum: CartSum;
  items: CartItem[];
  onClickItem?: (cartItem: CartItem) => void;
}

const CartDisplay = ({ sum, items, onClickItem }: CartDisplayProps) => {
  const [showDetail, showDetailSet] = useState(false);

  return (
    <section className="fixed inset-x-0 bottom-0 isolate flex flex-col gap-2 overflow-y-hidden py-2 px-2 text-sm sm:py-4">
      <div
        className={`container relative -z-10 mx-auto transition duration-300 ${
          !showDetail ? "pointer-events-none translate-y-full opacity-0" : ""
        }`}
      >
        <ul
          className={`container inset-x-0 max-h-60 overflow-y-auto rounded-3xl border bg-white shadow-lg ${
            sum.totalItem === 0 ? "pointer-events-none invisible" : ""
          } ${!showDetail ? "absolute" : ""}`}
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
      <div className="container mx-auto" data-cy="cart-toggle">
        <button
          className="flex w-full items-center gap-2 rounded-3xl border bg-white py-1 pl-4 pr-1 shadow-lg hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-gray-500 sm:pl-6"
          disabled={sum.totalItem === 0}
          onClick={() => showDetailSet((show) => !show)}
        >
          <span className="font-bold">Total</span>
          <span className="ml-auto">{rupiah(sum.totalPrice)}</span>
          <span className="flex aspect-square w-10 items-center justify-center rounded-full border">
            {sum.totalItem}
          </span>
        </button>
      </div>
    </section>
  );
};

export default CartDisplay;
