import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLSItem, LS_KEYS } from '../../utils/storage';
import Show from '../Show';

const FavoriteBanks = () => {
  const favorites = getLSItem(LS_KEYS.FAVORITES) || [];
  const navigate = useNavigate();
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
                <tr key={ifsc} onClick={() => navigate(`/bank-details/${ifsc}`)} style={{ cursor: 'pointer' }}>
                  <td>{bankName}</td>
                  <td>{ifsc}</td>
                  <td>{branch}</td>
                  <td>{bankId}</td>
                  <td>{address}</td>
                </tr>
              );
            })}
            <Show isVisible={favorites.length === 0}>
              <tr>
                <td colSpan={5}>
                  <h4 className="text-center text-danger">No favorite banks added yet</h4>
                </td>
              </tr>
            </Show>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteBanks;
