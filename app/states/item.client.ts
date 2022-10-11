import { atom } from "jotai";
import type { CartItem } from "~/components/item/cart2";
import type { ItemWithCategory } from "~/models/item.server";

export const itemsAtom = atom<ItemWithCategory[]>([]);
export const cartItemsAtom = atom<CartItem[]>([]);
export const cartSumAtom = atom((get) => {
  const sum = get(cartItemsAtom).reduce(
    (acc, curr, i) => {
      acc.totalItem += curr.quantity;
      acc.totalPrice += curr.price * curr.quantity;
      return acc;
    },
    {
      totalPrice: 0,
      totalItem: 0,
    }
  );

  return sum;
});
