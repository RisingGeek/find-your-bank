import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import filters from './filters.json';
import Loader from './loader/Loader';

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [filterItems, setFilterItems] = useState({
    city: filters.cities[0].value,
    category: 'DEFAULT',
  });

  const getBanks = (searchQuery) => {
    setIsLoading(true);

    const params = {
      city: filterItems.city,
      category: filterItems.category,
    };
    if (searchQuery) {
      params.query = searchQuery;
    }
    axiosInstance.get('/banks', {
      params,
    }).then(({ data }) => {
      setIsLoading(false);
      setBanks(data);
      setFilteredBanks(data);
    });
  };

  const getFilteredData = (searchQuery) => {
    console.log(filterItems);
    const filteredData = banks.filter((bank) => {
      const { city } = bank;
      const isCityFilter = !filterItems.city || filterItems.city === city;
      if (filterItems.category !== 'DEFAULT' && searchQuery) {
        const isPresent = filters.categories.some((category) => (
          filterItems.category === category.value
          && bank[filterItems.category].toString().toLowerCase()
            .includes(searchQuery.toString().toLowerCase())
        ));
        return isPresent && isCityFilter;
      }

      return isCityFilter;
    });
    setCurrPage(0);
    setFilteredBanks(filteredData);
  };

  useEffect(() => {
    getBanks();
  }, []);

  const getPaginatedData = () => {
    if (filteredBanks.length === 0) {
      return { bankData: [], start: 0, end: 0 };
    }
    const startIdx = currPage * pageSize;
    const endIdx = startIdx + pageSize;
    return { bankData: filteredBanks.slice(startIdx, endIdx), start: startIdx, end: endIdx };
  };

  const handlePreviousPage = () => {
    setCurrPage(currPage - 1);
  };

  const handleNextPage = () => {
    setCurrPage(currPage + 1);
  };

  const handleChangePageSize = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    // Set current page to 0 when page size is changed
    setCurrPage(0);
  };

  const handleFilter = (item) => {
    setFilterItems({ ...filterItems, ...item });
  };

  const { bankData, start, end } = getPaginatedData();
  const paginationText = `${start + 1} - ${end} of ${filteredBanks.length}`;

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h3>All Banks</h3>
        </div>
        <div className="col-sm-2">
          <select
            className="form-select"
            aria-label="Select City"
            value={filterItems.city}
            onChange={(event) => handleFilter({ city: event.target.value })}
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
        <div className="col-sm-2">
          <select
            className="form-select"
            aria-label="Select Category"
            value={filterItems.category}
            onChange={(event) => handleFilter({ category: event.target.value })}
          >
            <option value="DEFAULT" disabled>Select Category</option>
            {filters.categories.map((category) => (
              <option key={category.value} value={category.value}>{category.text}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            onKeyUp={(event) => getFilteredData(event.target.value)}
            disabled={filterItems.category === 'DEFAULT'}
            placeholder="Search"
          />
        </div>
      </div>

      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Bank</th>
                  <th scope="col">IFSC</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Bank ID</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {
              bankData.map((bank) => {
                const {
                  bank_name: bankName, ifsc, branch, bank_id: bankId, address,
                } = bank;

                return (
                  <tr key={ifsc}>
                    <td>{bankName}</td>
                    <td>{ifsc}</td>
                    <td>{branch}</td>
                    <td>{bankId}</td>
                    <td>{address}</td>
                  </tr>
                );
              })
            }
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            <div className="d-flex align-items-center">
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
            <div className="d-flex align-items-center">
              <button type="button" className="btn btn-light" onClick={handlePreviousPage}>&lt;</button>
              <div className="px-2">{paginationText}</div>
              <button type="button" className="btn btn-light" onClick={handleNextPage}>&gt;</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BankList;
