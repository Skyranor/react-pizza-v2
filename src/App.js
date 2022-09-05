import Header from './component/Header';
import Sort from './component/Sort';
import Categories from './component/Categories';
import PizzaBlock from './component/PizzaBlock';

import './scss/app.scss';
import { useEffect, useState } from 'react';

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://6315a6a55b85ba9b11e3fc35.mockapi.io/items');
      const json = await response.json();
      setPizzas(json);
    })();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories />  */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map(pizza => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
