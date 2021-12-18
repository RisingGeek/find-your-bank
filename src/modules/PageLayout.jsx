import PropTypes from 'prop-types';
import React from 'react';
import SideBar from './side-bar/SideBar';

const PageLayout = (props) => {
  const { children } = props;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <SideBar />
        </div>
        <div className="col-sm-10">
          {children}
        </div>
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageLayout;
