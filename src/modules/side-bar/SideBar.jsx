import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <ul>
    <li>
      <Link to="/all-banks">All Banks</Link>
    </li>
    <li>
      <Link to="/all-banks">Favorites</Link>
    </li>
  </ul>
);

export default SideBar;
