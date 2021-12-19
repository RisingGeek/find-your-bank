import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { getLSItem, LS_KEYS, setLSItem } from '../../utils/storage';
import Loader from '../loader/Loader';

const BankDetail = () => {
  const [banks, setBanks] = useState(getLSItem(LS_KEYS.BANKS) || []);
  const [favorites, setFavorites] = useState(getLSItem(LS_KEYS.FAVORITES) || []);
  const [isLoading, setIsLoading] = useState(false);

  const selectedCity = getLSItem(LS_KEYS.CITY);
  // Grab IFSC from params
  const { ifsc } = useParams();
  const isFavorite = favorites.some((favorite) => favorite.ifsc === ifsc);
  // Grab bank with IFSC code
  const selectedBank = banks.find((bank) => bank.ifsc === ifsc);

  // Handle edge case. If cache is expired, call API to fetch data.
  // This only calls the API when cache is expired
  useEffect(() => {
    if (banks.length > 0) {
      return;
    }
    setIsLoading(true);
    axiosInstance.get('/banks', {
      params: {
        city: selectedCity,
      },
    }).then(({ data }) => {
      setIsLoading(false);
      setLSItem(LS_KEYS.BANKS, data, 5);
      setBanks(data);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // No record found with given IFSC
  if (!selectedBank) {
    return (
      <h4 className="text-center text-danger">
        No record found for bank with IFSC:
        &nbsp;
        {ifsc}
      </h4>
    );
  }

  // Check / Uncheck favorite
  const handleFavorite = () => {
    if (!isFavorite) {
      // Mark as favorite
      const newFavorites = [...favorites, selectedBank];
      setFavorites(newFavorites);
      setLSItem(LS_KEYS.FAVORITES, newFavorites);
      return;
    }
    // Remove from favorites
    const newFavorites = [...favorites.slice(0, favorites.length - 1)];
    setFavorites(newFavorites);
    setLSItem(LS_KEYS.FAVORITES, newFavorites);
  };

  const {
    bank_name: bankName, branch, city, district, state, bank_id: bankId, address,
  } = selectedBank;

  const bankData = [
    { label: 'Bank Name', value: bankName },
    { label: 'IFSC', value: ifsc },
    { label: 'Branch', value: branch },
    { label: 'City', value: city },
    { label: 'District', value: district },
    { label: 'State', value: state },
    { label: 'Bank ID', value: bankId },
    { label: 'Address', value: address },
  ];

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
            {bankData.map((item) => (
              <tr key={item.label}>
                <td className="fw-bold">{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-dark fw-bold"
        onClick={handleFavorite}
      >
        {isFavorite ? 'Remove from  Favorites ❤️' : 'Mark as Favorite ❤️'}
      </button>
    </div>
  );
};

export default BankDetail;
