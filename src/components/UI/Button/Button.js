import React from 'react';

import './Button.css';

const Button = ( { disabled, type, buttonType, clicked, children }) => (
  <button
    disabled={disabled}
    type={type}
    className={['Button', buttonType].join(' ')}
    onClick={clicked}>
    {children}
  </button>
);

export default Button;
