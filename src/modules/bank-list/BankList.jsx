import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { getLSItem, LS_KEYS, setLSItem } from '../../utils/storage';
import filters from '../filters.json';
import Loader from '../loader/Loader';
import Show from '../Show';
import styles from './bank-list.module.css';
import BankFilters from './BankFilters';
import Pagination from './Pagination';

const BankList = () => {
  const banks = getLSItem(LS_KEYS.BANKS);

  const [filteredBanks, setFilteredBanks] = useState(banks || []);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [filterItems, setFilterItems] = useState({
    city: filters.cities[0].value,
    category: 'DEFAULT',
    searchQuery: '',
  });
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  // Get All banks API call
  const getBanks = () => {
    setIsLoading(true);
    axiosInstance.get('/banks', {
      params: {
        city: filterItems.city,
      },
    }).then(({ data }) => {
      setIsLoading(false);
      setLSItem(LS_KEYS.BANKS, data, 5);
      setLSItem(LS_KEYS.CITY, filterItems.city);
      setFilteredBanks(data);
    }).catch((err) => {
      setIsLoading(false);
      setError(`Unexpected error occured ${err}`);
    });
  };

  // Call API if cache expires or city changes
  useEffect(() => {
    if (!banks || getLSItem(LS_KEYS.CITY) !== filterItems.city) {
      getBanks();
    } else {
      setIsLoading(false);
    }
  }, [filterItems.city]);

  // Get banks for current page
  const getPaginatedData = () => {
    if (filteredBanks.length === 0) {
      return { bankData: [], start: 0, end: 0 };
    }
    const startIdx = currPage * pageSize;
    const endIdx = Math.min(filteredBanks.length, startIdx + pageSize);
    return { bankData: filteredBanks.slice(startIdx, endIdx), start: startIdx, end: endIdx };
  };

  // Go to previous page
  const handlePreviousPage = () => {
    setCurrPage(currPage - 1);
  };

  // Go to next page
  const handleNextPage = () => {
    setCurrPage(currPage + 1);
  };

  // Changes number of banks displayed on 1 page & defaults to page 0
  const handleChangePageSize = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    // Set current page to 0 when page size is changed
    setCurrPage(0);
  };

  // Update filter items
  const handleFilter = (item) => {
    setFilterItems({ ...filterItems, ...item });
  };

  // Filters banks on the basis of city, category and search query
  const getFilteredData = (searchQuery) => {
    const filteredData = banks.filter((bank) => {
      const { city } = bank;
      // Match city
      const isCityFilter = !filterItems.city || filterItems.city === city;

      // Check if category is selected and user has entered search query
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
    handleFilter({ searchQuery });
    setCurrPage(0);
    setFilteredBanks(filteredData);
  };

  const { bankData, start, end } = getPaginatedData();
  const paginationText = `${start + 1} - ${end} of ${filteredBanks.length}`;

  return (
    <>
      <BankFilters
        filterItems={filterItems}
        handleFilter={handleFilter}
        getFilteredData={getFilteredData}
      />

      {isLoading && <Loader />}

      <Show isVisible={!!error}>
        <p className="text-danger">{error}</p>
      </Show>

      <Show isVisible={!isLoading}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className={styles.thead}>
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
                      <tr key={ifsc} onClick={() => navigate(`/bank-details/${ifsc}`)} style={{ cursor: 'pointer' }}>
                        <td>{bankName}</td>
                        <td>{ifsc}</td>
                        <td>{branch}</td>
                        <td>{bankId}</td>
                        <td>{address}</td>
                      </tr>
                    );
                  })
                }
              {!filteredBanks.length && (
              <tr>
                <td colSpan={5} className="text-center">No Banks found</td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        <Show isVisible={filteredBanks.length > 0}>
          <Pagination
            pageSize={pageSize}
            handleChangePageSize={handleChangePageSize}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            paginationText={paginationText}
          />
        </Show>
      </Show>
    </>
  );
};

export default BankList;
