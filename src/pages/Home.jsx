import React from 'react';
import { useEffect, useState, useContext } from 'react';

import Sort from '../component/Sort';
import Categories from '../component/Categories';
import PizzaBlock from '../component/PizzaBlock';
import Skeleton from '../component/PizzaBlock/Skeleton';
import Pagination from '../component/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности(ASK)', sortProperty: 'rating' });
  const [countOfItems, setCountOfItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const category = categoryId ? `&category=${categoryId}` : '';
  const sortBy = sortType.sortProperty.replace('-', '');
  const order = sortType.sortProperty.includes('-') ? 'desc' : 'ask';
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await fetch(
        // ${order}
        `https://6315a6a55b85ba9b11e3fc35.mockapi.io/items?${search}&page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`
      );
      const json = await response.json();
      setCountOfItems(json.count);
      setItems(json.items);
      setIsLoading(false);
    })();
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = new Array(10).fill('').map((item, index) => <Skeleton key={index} />);
  const pizzas = items
    // .filter(pizza => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
          <Sort sortType={sortType} setSortType={setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination countOfItems={countOfItems} setCurrentPage={number => setCurrentPage(number)} />
      </div>
    </>
  );
}

export default Home;
