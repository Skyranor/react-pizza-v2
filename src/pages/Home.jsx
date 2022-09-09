import React from 'react';
import { useEffect, useState } from 'react';

import Sort from '../component/Sort';
import Categories from '../component/Categories';
import PizzaBlock from '../component/PizzaBlock';
import Skeleton from '../component/PizzaBlock/Skeleton';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности(ASK)', sortProperty: 'rating' });

  const category = categoryId ? `category=${categoryId}` : '';
  const sortBy = sortType.sortProperty.replace('-', '');
  const order = sortType.sortProperty.includes('-') ? 'desc' : 'ask';

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await fetch(
        // ${order}
        `https://6315a6a55b85ba9b11e3fc35.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      );
      const json = await response.json();
      setPizzas(json);
      setIsLoading(false);
    })();
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
          <Sort sortType={sortType} setSortType={setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? new Array(8).fill('').map((item, index) => <Skeleton key={index} />)
            : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
