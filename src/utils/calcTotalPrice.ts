import { CartItemType } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: CartItemType[]) =>
  items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
