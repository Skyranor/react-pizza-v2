import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.scss';

function Pagination({ setCurrentPage }) {
  const { countOfItems } = useSelector(state => state.pizza);
  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        // onPageChange={handlePageClick}
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
