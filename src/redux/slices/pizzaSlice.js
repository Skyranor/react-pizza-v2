import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ category, sortBy, order, search, currentPage }) => {
    const { data } = await axios(
      `https://6315a6a55b85ba9b11e3fc35.mockapi.io/items?${search}&page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  countOfItems: 0,
  status: 'loading' // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
    }
  },

  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading';
      state.items = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.countOfItems = action.payload.count;
      state.status = 'sucsess';
    },

    [fetchPizzas.rejected]: state => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
