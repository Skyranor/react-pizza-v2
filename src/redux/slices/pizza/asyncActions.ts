import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizzas, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizzas, SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ category, sortBy, order, search, currentPage }) => {
    const { data } = await axios.get<Pizzas>(
      `https://6315a6a55b85ba9b11e3fc35.mockapi.io/items?${search}&page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);
