import React from 'react';

import './Backdrop.css';

const backdrop = ({ show, clicked }) => (
  show ? (
    <div
      role='presentation'
      className="Backdrop"
      onClick={clicked}
      aria-hidden="true"
    />
  ) : null
);

export default backdrop;
