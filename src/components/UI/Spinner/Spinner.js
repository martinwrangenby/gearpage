import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div role="status" aria-live="polite" aria-busy="true" className="SpinnerWrapper">
    <div className="Spinner" aria-hidden="true" />
    <span className="visually-hidden">Loading...</span>
  </div>
);

export default Spinner;
