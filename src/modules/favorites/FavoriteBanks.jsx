import React from 'react';
import { getLSItem, LS_KEYS } from '../../utils/storage';

const FavoriteBanks = () => {
  const favorites = getLSItem(LS_KEYS.FAVORITES) || [];
  return (
    <div>
      <h1>Favorite Banks</h1>
      <div className="table-responsive">
        <table className="table table-striped">
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
            {favorites.map((favorite) => {
              const {
                bank_name: bankName, ifsc, branch, bank_id: bankId, address,
              } = favorite;
              return (
                <tr>
                  <td>{bankName}</td>
                  <td>{ifsc}</td>
                  <td>{branch}</td>
                  <td>{bankId}</td>
                  <td>{address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteBanks;
