import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLSItem, setLSItem } from '../../utils/storage';

const BankDetail = () => {
  const [favorites, setFavorites] = useState(getLSItem('favorites') || []);

  const banks = getLSItem('banks') || [];
  const { ifsc } = useParams();
  const isFavorite = favorites.some((favorite) => favorite.ifsc === ifsc);

  const selectedBank = banks.find((bank) => bank.ifsc === ifsc);

  if (!selectedBank) {
    return (
      <h4 className="text-center text-danger">
        No record found for bank with IFSC:
        &nbsp;
        {ifsc}
      </h4>
    );
  }

  const handleFavorite = () => {
    if (!isFavorite) {
      // Mark as favorite
      const newFavorites = [...favorites, selectedBank];
      setFavorites(newFavorites);
      setLSItem('favorites', newFavorites);
      return;
    }
    // Remove from favorites
    const newFavorites = [...favorites.slice(0, favorites.length - 1)];
    setFavorites(newFavorites);
    setLSItem('favorites', newFavorites);
  };

  const {
    bank_name: bankName, branch, city, district, state, bank_id: bankId, address,
  } = selectedBank;

  return (
    <div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">Bank Name</td>
              <td>{bankName}</td>
            </tr>
            <tr>
              <td className="fw-bold">IFSC</td>
              <td>{ifsc}</td>
            </tr>
            <tr>
              <td className="fw-bold">Branch</td>
              <td>{branch}</td>
            </tr>
            <tr>
              <td className="fw-bold">City</td>
              <td>{city}</td>
            </tr>
            <tr>
              <td className="fw-bold">district</td>
              <td>{district}</td>
            </tr>
            <tr>
              <td className="fw-bold">State</td>
              <td>{state}</td>
            </tr>
            <tr>
              <td className="fw-bold">Bank ID</td>
              <td>{bankId}</td>
            </tr>
            <tr>
              <td className="fw-bold">Address</td>
              <td>{address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-dark fw-bold" onClick={handleFavorite}>{isFavorite ? 'Remove from  Favorites ❤️' : 'Mark as Favorite ❤️'}</button>
    </div>
  );
};

export default BankDetail;
