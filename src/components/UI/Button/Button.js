import React from 'react';

import './Button.css';

const Button = ( { disabled, type, buttonType, clicked, dataTestId, children }) => (
  <button
    disabled={disabled}
    type={type}
    className={['Button', buttonType].join(' ')}
    onClick={clicked}
    data-testid={dataTestId}>
    {children}
  </button>
);

export default Button;
