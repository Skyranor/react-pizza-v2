import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
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
import { useRef } from 'react';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort } = useSelector(state => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [countOfItems, setCountOfItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const category = categoryId ? `&category=${categoryId}` : '';
  const sortBy = sort.property.replace('-', '');
  const order = sort.property.includes('-') ? 'desc' : 'ask';
  const search = searchValue ? `&search=${searchValue}` : '';

  const fetchPizzas = () => {
    setIsLoading(true);
    (async () => {
      const { data } = await axios(
        `https://6315a6a55b85ba9b11e3fc35.mockapi.io/items?${search}&page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`
      );
      setCountOfItems(data.count);
      setItems(data.items);
      setIsLoading(false);
    })();
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
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = new Array(10).fill('').map((item, index) => <Skeleton key={index} />);
  const pizzas = items
    // .filter(pizza => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination countOfItems={countOfItems} setCurrentPage={number => setCurrentPage(number)} />
      </div>
    </>
  );
}

export default Home;
