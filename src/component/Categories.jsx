import React, { useState } from 'react';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <ul className="categories">
      {categories.map((category, index) => (
        <li
          key={category}
          onClick={() => setActiveCategory(index)}
          className={index === activeCategory ? 'active' : ''}>
          {category}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
