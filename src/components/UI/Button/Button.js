import React from 'react';

import './Button.css';

const button = (props) => (
  <button
    type={props.type}
    className={['Button', props.buttonType].join(' ')}
    onClick={props.clicked}
    data-test-id={props.dataTestId}>
    {props.children}
  </button>
);

export default button;
