import React, { useRef, useState, useCallback } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce(str => {
      dispatch(setSearchValue(str));
    }, 150),
    []
  );

  const onChangeInput = event => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  const clearInput = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={`${styles.icon} ${styles.iconSearch}`}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
        value={value}
      />
      {value && (
        <svg
          className={`${styles.icon} ${styles.iconClear}`}
          onClick={clearInput}
          height="14px"
          version="1.1"
          viewBox="0 0 14 14"
          width="14px"
          xmlns="http://www.w3.org/2000/svg">
          <title />
          <desc />
          <defs />
          <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)">
              <g id="close" transform="translate(341.000000, 89.000000)">
                <path
                  d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}

export default Search;
