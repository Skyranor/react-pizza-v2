import React from 'react';

import { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort } = useSelector(state => state.filter);
  const { items, status } = useSelector(state => state.pizza);

  const { searchValue } = useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(1);

  const getPizzas = async () => {
    const category = categoryId ? `&category=${categoryId}` : '';
    const sortBy = sort.property.replace('-', '');
    const order = sort.property.includes('-') ? 'desc' : 'ask';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        categoryId
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  // Если был первый рендер, то провепяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));

      dispatch(
        setFilters({
          ...params
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = new Array(10).fill('').map((item, index) => <Skeleton key={index} />);
  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <span>&#128542;</span>
            <h1>Произошла ошибка</h1>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
          </div>
        ) : (
          <>
            <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            <Pagination setCurrentPage={number => setCurrentPage(number)} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
