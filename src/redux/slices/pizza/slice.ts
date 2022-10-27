import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { Pizzas, PizzaSliceState, Status } from './types';

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
