import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllBanks from './all-banks';
import BankDetails from './bank-details';
import Favorites from './favorites';
import HomePage from './index';

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="all-banks" element={<AllBanks />} />
      <Route path="/bank-details/:ifsc" element={<BankDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
