import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

type Pizzas = {
  count: number;
  items: Pizza[];
};

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: Pizza[];
  countOfItems: number;
  status: Status;
}

export const fetchPizzas = createAsyncThunk<Pizzas, SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ category, sortBy, order, search, currentPage }) => {
    const { data } = await axios.get<Pizzas>(
      `https://6315a6a55b85ba9b11e3fc35.mockapi.io/items?${search}&page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  countOfItems: 0,
  status: Status.LOADING // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizzas>) {
      state.items = action.payload.items;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.countOfItems = action.payload.count;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
