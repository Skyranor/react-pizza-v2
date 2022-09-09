import React, { useState } from 'react';

function Categories({ categoryId, setCategoryId }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <ul className="categories">
      {categories.map((category, index) => (
        <li
          key={category}
          onClick={() => setCategoryId(index)}
          className={index === categoryId ? 'active' : ''}>
          {category}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
