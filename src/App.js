import Header from './component/Header';
import Sort from './component/Sort';
import Categories from './component/Categories';
import PizzaBlock from './component/PizzaBlock';
import pizzas from './assets/img/pizzas.json';

import './scss/app.scss';
console.log(pizzas);
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
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
