import React from 'react';
import styles from './loader.module.css';

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className={styles.loader} />
  </div>
);

export default Loader;
