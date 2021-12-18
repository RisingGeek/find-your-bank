import React from 'react';
import SideBar from './side-bar/SideBar';

const PageLayout = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-2">
        <SideBar />
      </div>
      <div className="col-sm-10" />
    </div>
  </div>
);

export default PageLayout;
