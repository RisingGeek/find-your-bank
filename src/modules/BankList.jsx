import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    axiosInstance.get('/banks?city=CHANDIGARH').then(({ data }) => {
      setBanks(data);
      setTotalPages(Math.ceil(data.length / pageSize));
    });
  }, []);

  const getPaginatedData = () => {
    if (banks.length === 0) {
      return { bankData: [], start: 0, end: 0 };
    }
    const startIdx = currPage * pageSize;
    const endIdx = startIdx + pageSize;
    return { bankData: banks.slice(startIdx, endIdx), start: startIdx, end: endIdx };
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
    setTotalPages(Math.ceil(banks.length / newPageSize));
    // Set current page to 0 when page size is changed
    setCurrPage(0);
  };

  const { bankData, start, end } = getPaginatedData();
  const paginationText = `${start + 1} - ${end} of ${totalPages}`;

  return (
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
  );
};

export default BankList;
