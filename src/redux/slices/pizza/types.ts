export type Pizza = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export type Pizzas = {
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
