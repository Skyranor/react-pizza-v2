import { CartSliceState } from '../redux/slices/cart/types';
import { calcTotalCount } from './calcTotalCount';
import { calcTotalPrice } from './calcTotalPrice';

export const calcTotalCountAndPrice = (state: CartSliceState) => {
  state.totalPrice = calcTotalPrice(state.items);
  state.totalCount = calcTotalCount(state.items);
};
