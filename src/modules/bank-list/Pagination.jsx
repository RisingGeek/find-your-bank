import propTypes from 'prop-types';
import React from 'react';
import styles from './bank-list.module.css';

const Pagination = (props) => {
  const {
    pageSize, handleChangePageSize, handlePreviousPage, handleNextPage, paginationText,
  } = props;
  return (
    <div className={`d-flex flex-wrap ${styles.pagination}`}>

      {/* Number of banks to display per page */}
      <div className="d-flex align-items-center py-2">
        <span className="mx-2">Rows per page:</span>
        <div className="form-group">
          <input
            type="number"
            className="form-control w-50"
            value={pageSize}
            onChange={handleChangePageSize}
          />
        </div>
      </div>

      {/* Displays start, end of bank number & total number of filtered banks */}
      <div className="d-flex align-items-center">
        <button type="button" className="btn btn-light" onClick={handlePreviousPage}>&lt;</button>
        <div className="px-2">{paginationText}</div>
        <button type="button" className="btn btn-light" onClick={handleNextPage}>&gt;</button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  handleChangePageSize: propTypes.func.isRequired,
  handlePreviousPage: propTypes.func.isRequired,
  handleNextPage: propTypes.func.isRequired,
  paginationText: propTypes.string.isRequired,
};

export default Pagination;
