import { useState } from "react";
import type { ItemWithCategory } from "~/models/item.server";
import CartDisplay, { type CartItem } from "./cart";
import ItemList from "./list";

type MenuViewProps = {
  items: ItemWithCategory[];
};

const MenuView = ({ items }: MenuViewProps) => {
  const [menuItems, menuItemsSet] = useState(items);
  const [cartItems, cartItemsSet] = useState<CartItem[]>([]);

  const addItemToCart = (item: ItemWithCategory) => {
    item.stock -= 1;

    cartItemsSet((items) => {
      const itemIndex = items.findIndex((i) => i.id === item.id);
      if (itemIndex < 0) {
        return [...items, { ...item, quantity: 1 }];
      }

      const firstSlice = items.slice(0, itemIndex - 1);
      const lastSlice = items.slice(itemIndex + 1, -1);

      return [
        ...firstSlice,
        { ...item, quantity: items[itemIndex].quantity + 1 },
        ...lastSlice,
      ];
    });
  };

  const removeItemFromCart = (item: CartItem) => {
    item.stock += 1;
    item.quantity -= 1;

    menuItemsSet((items) => {
      const itemIndex = items.findIndex((i) => i.id === item.id);
      if (itemIndex < 0) {
        return items;
      }

      items[itemIndex].stock = item.stock;
      return items;
    });

    cartItemsSet((items) => {
      // get cart item index
      const itemIndex = items.findIndex((i) => i.id === item.id);
      if (itemIndex < 0) {
        return items;
      }

      // remove from cart items list
      if (item.quantity <= 0) return items.filter((i) => i.id !== item.id);

      items[itemIndex].quantity = item.quantity;

      return [...items];
    });
  };

  return (
    <>
      <ItemList items={menuItems} onClickItem={addItemToCart} />
      <CartDisplay items={cartItems} onClickItem={removeItemFromCart} />
    </>
  );
};

export default MenuView;
