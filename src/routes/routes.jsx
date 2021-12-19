import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageLayout from '../modules/PageLayout';
import AllBanks from './all-banks';
import BankDetails from './bank-details';
import Favorites from './favorites';
import HomePage from './index';

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
      <Route path="all-banks" element={<PageLayout><AllBanks /></PageLayout>} />
      <Route path="/bank-details/:ifsc" element={<PageLayout><BankDetails /></PageLayout>} />
      <Route path="/favorites" element={<PageLayout><Favorites /></PageLayout>} />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
