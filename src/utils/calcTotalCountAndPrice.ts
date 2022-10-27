import { CartSliceState } from '../redux/slices/cart/types';

export const calcTotalCountAndPrice = (state: CartSliceState) => {
  state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
  state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
};
