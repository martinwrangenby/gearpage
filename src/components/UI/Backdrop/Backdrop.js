import React from 'react';

import './Backdrop.css';

const backdrop = ({ show, clicked }) => (
  show ? <div className="Backdrop" onClick={clicked} data-testid='backdrop'></div> : null
);

export default backdrop;
