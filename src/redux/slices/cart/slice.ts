import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../../utils/calcTotalCount';
import { calcTotalCountAndPrice } from '../../../utils/calcTotalCountAndPrice';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { CartItemType, CartSliceState } from './types';

const items = getCartFromLS();

const initialState: CartSliceState = {
  items,
  totalPrice: calcTotalPrice(items),
  totalCount: calcTotalCount(items)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
      calcTotalCountAndPrice(state);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
      }

      calcTotalCountAndPrice(state);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      calcTotalCountAndPrice(state);
    },

    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    }
  }
});

export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
