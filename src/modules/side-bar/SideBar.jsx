import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <ul className="list-group mb-4">
    <li className="list-group-item">
      <Link to="/all-banks">All Banks</Link>
    </li>
    <li className="list-group-item">
      <Link to="/favorites">Favorites</Link>
    </li>
  </ul>
);

export default SideBar;
