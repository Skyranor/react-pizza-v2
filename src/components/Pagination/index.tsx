import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/slices/filter/selectors';
import { setCurrentPage } from '../../redux/slices/filter/slice';
import { selectPizzaData } from '../../redux/slices/pizza/selectors';
import styles from './Pagination.module.scss';

export const Pagination: React.FC = () => {
  const { countOfItems } = useSelector(selectPizzaData);
  const { currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageCount={Math.ceil(countOfItems / 8)}
      previousLabel="<"
    />
  );
};
