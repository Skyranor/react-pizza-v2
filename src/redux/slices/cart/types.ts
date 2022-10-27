export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  size: number;
  dough: string;
  count: number;
};

export interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
}
