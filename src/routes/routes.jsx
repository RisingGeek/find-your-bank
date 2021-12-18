import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllBanks from './all-banks';
import HomePage from './index';

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="all-banks" element={<AllBanks />} />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
