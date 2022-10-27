export type SortType = {
  name: string;
  property: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};

export type FilterType = {
  categoryId: string;
  sort: SortType;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortType;
}
