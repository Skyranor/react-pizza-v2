import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  searchValue: '',
  sort: { name: 'популярности(ASK)', property: 'rating' }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    }
  }
});

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
