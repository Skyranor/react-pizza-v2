import React from 'react';
import { useEffect, useState } from 'react';

import Sort from '../component/Sort';
import Categories from '../component/Categories';
import PizzaBlock from '../component/PizzaBlock';
import Skeleton from '../component/PizzaBlock/Skeleton';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://6315a6a55b85ba9b11e3fc35.mockapi.io/items');
      const json = await response.json();
      setPizzas(json);
      setIsLoading(false);
    })();
  }, []);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
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
