// import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

function Categories({ categoryId }) {
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <ul className="categories">
      {categories.map((category, index) => (
        <li
          key={category}
          onClick={() => dispatch(setCategoryId(index))}
          className={index === categoryId ? 'active' : ''}>
          {category}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
