import propTypes from 'prop-types';
import React from 'react';
import filters from '../filters.json';

const BankFilters = (props) => {
  const { filterItems, handleFilter, getFilteredData } = props;
  return (
    <div className="row">
      <div className="col-sm-6">
        <h3>All Banks</h3>
      </div>

      {/* City Dropdown */}
      <div className="col-sm-2 mb-2">
        <select
          className="form-select"
          aria-label="Select City"
          value={filterItems.city}
          onChange={(event) => handleFilter({ city: event.target.value, searchQuery: '' })}
        >
          <option disabled>Select City</option>
          {filters.cities.map((city) => (
            <option
              key={city.value}
              value={city.value}
            >
              {city.text}
            </option>
          ))}
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="col-sm-2 mb-2">
        <select
          className="form-select"
          aria-label="Select Category"
          value={filterItems.category}
          onChange={(event) => handleFilter({ category: event.target.value, searchQuery: '' })}
        >
          <option value="DEFAULT" disabled>Select Category</option>
          {filters.categories.map((category) => (
            <option key={category.value} value={category.value}>{category.text}</option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="col-sm-2 mb-2">
        <input
          type="text"
          className="form-control"
          value={filterItems.searchQuery}
          onChange={(event) => getFilteredData(event.target.value)}
          disabled={filterItems.category === 'DEFAULT'}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

BankFilters.propTypes = {
  filterItems: propTypes.shape({
    city: propTypes.string,
    category: propTypes.string,
    searchQuery: propTypes.string,
  }).isRequired,
  handleFilter: propTypes.func.isRequired,
  getFilteredData: propTypes.func.isRequired,
};

export default BankFilters;
