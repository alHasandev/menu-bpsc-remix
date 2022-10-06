export type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type CartSum = {
  totalPrice: number;
  totalItem: number;
};

export type CartItem = Item & {
  quantity: number;
};
