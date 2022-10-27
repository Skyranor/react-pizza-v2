import { useDispatch } from 'react-redux';
import React from 'react';
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';

type CategoriesProps = {
  categoryId: number;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId }) => {
  const dispatch = useDispatch();

  const onClickCategory = (category: number) => {
    dispatch(setCategoryId(category));
    dispatch(setCurrentPage(1));
  };

  return (
    <ul className="categories">
      {categories.map((category, index) => (
        <li
          key={category}
          onClick={() => onClickCategory(index)}
          className={index === categoryId ? 'active' : ''}>
          {category}
        </li>
      ))}
    </ul>
  );
});

export default Categories;
