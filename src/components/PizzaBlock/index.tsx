import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/slices/cart/selectors';
import { addItem } from '../../redux/slices/cart/slice';
import { CartItemType } from '../../redux/slices/cart/types';

const dough = ['Тонкое', 'Традиционное'];

type PizzaBlockProps = {
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  id: string;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, imageUrl, price, sizes, types, id }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [sizeIndex, setSizeIndex] = useState(0);
  const [doughIndex, setDoughIndex] = useState(types[0]);

  const addedCount = cartItem ? cartItem.count : null;

  const onClickAdd = () => {
    const item: CartItemType = {
      title,
      imageUrl,
      price,
      size: sizes[sizeIndex],
      dough: dough[doughIndex],
      id,
      count: 0
    };
    dispatch(addItem(item));
  };
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setDoughIndex(typeId)}
              className={doughIndex === typeId ? ' active' : ''}>
              {dough[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              onClick={() => setSizeIndex(index)}
              className={sizeIndex === index ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount ? <i>{addedCount}</i> : null}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;