import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectPizzaData } from '../../redux/slices/pizzaSlice';
import styles from './Pagination.module.scss';

function Pagination({ setCurrentPage }) {
  const { countOfItems } = useSelector(selectPizzaData);
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={Math.ceil(countOfItems / 4)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
