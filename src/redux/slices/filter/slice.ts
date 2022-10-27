import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, FilterType, SortType } from './types';

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: { name: 'популярности(DESK)', property: 'rating' }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterType>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.categoryId = 0;
        state.currentPage = 1;
        state.sort = { name: 'популярности(DESK)', property: 'rating' };
      }
    }
  }
});

export const { setCategoryId, setCurrentPage, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
