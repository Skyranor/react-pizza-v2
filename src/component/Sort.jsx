import React, { useState } from 'react';

function Sort({ sortType, setSortType }) {
  const [open, setOpen] = useState(false);
  const sortList = [
    { name: 'популярности(ASK)', sortProperty: 'rating' },
    { name: 'популярности(DESK)', sortProperty: '-rating' },
    { name: 'цене(ASK)', sortProperty: 'price' },
    { name: 'цене(DESK)', sortProperty: '-price' },
    { name: 'алфавиту(ASK)', sortProperty: 'title' },
    { name: 'алфавиту(DESK)', sortProperty: '-title' }
  ];

  const onClickSortList = obj => {
    setSortType(obj);
    setOpen(false);
  };
  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <div className="sort__inner">
          <span onClick={() => setOpen(!open)}>{sortType.name}</span>
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.0145393 1.59206C0.0156564 1.42279 0.0784708 1.27672 0.202982 1.15384C0.327494 1.03096 0.474383 0.970077 0.643651 0.971194L9.39346 1.02894C9.56273 1.03006 9.7088 1.09287 9.83168 1.21738C9.95456 1.3419 10.0154 1.48879 10.0143 1.65805C10.0132 1.82732 9.95039 1.97339 9.82588 2.09627L5.4221 6.4423C5.29759 6.56518 5.1507 6.62606 4.98143 6.62495C4.81216 6.62383 4.66609 6.56101 4.54321 6.4365L0.197182 2.03272C0.074303 1.90821 0.0134222 1.76132 0.0145393 1.59206Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={obj.name}
                onClick={() => onClickSortList(obj)}
                className={sortType.name === obj.name ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
