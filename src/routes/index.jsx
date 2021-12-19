import React from 'react';

// Filename of routes must be in lowercase & match the route name for simplicity
const HomePage = () => (
  <div>
    <h1>Find Your Bank</h1>
    <h3 className="mt-4">Salient Features</h3>
    <ul className="list-group mb-4">
      <li className="list-group-item">
        List all banks based on City with filter/search logic
      </li>
      <li className="list-group-item">
        Individual bank details based on IFSC
      </li>
      <li className="list-group-item">
        Pagination (editable)
      </li>
      <li className="list-group-item">
        API response caching
      </li>
      <li className="list-group-item">
        Edge cases handled
      </li>
      <li className="list-group-item">
        Mark bank as favorite
      </li>
    </ul>

    <p>
      For pagination, I have added manual pagination instead of using a library like
      react-paginate
    </p>
  </div>
);

export default HomePage;
