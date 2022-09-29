import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
};

const total = state => {
  state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
  state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
      total(state);
    },

    minusItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id);
      findItem.count--;
      total(state);
    },

    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      total(state);
    },

    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    }
  }
});

export const selectCart = state => state.cart;
export const selectCartItemById = id => state => state.cart.items.find(obj => obj.id === id);

export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
