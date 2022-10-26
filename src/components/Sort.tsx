import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSort, SortType } from '../redux/slices/filterSlice';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

// type SortType = {
//   name: string;
//   property: string;
// };

export const sortList: SortType[] = [
  { name: 'популярности(DESK)', property: '-rating' },
  { name: 'популярности(ASK)', property: 'rating' },
  { name: 'цене(DESK)', property: '-price' },
  { name: 'цене(ASK)', property: 'price' },
  { name: 'алфавиту(DESK)', property: '-title' },
  { name: 'алфавиту(ASK)', property: 'title' }
];

type SortProps = {
  sort: SortType;
};

const Sort: React.FC<SortProps> = React.memo(({ sort }) => {
  useWhyDidYouUpdate('SortProps', { sort });
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const onClickItemList = (obj: SortType) => {
    dispatch(setSort(obj));
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);
  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <div ref={sortRef} className="sort__inner">
          <span onClick={() => setOpen(!open)}>{sort.name}</span>
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
            {sortList.map((obj) => (
              <li
                key={obj.name}
                onClick={() => onClickItemList(obj)}
                className={sort.name === obj.name ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
