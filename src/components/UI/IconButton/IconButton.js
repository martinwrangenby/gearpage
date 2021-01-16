import React from 'react';
import './IconButton.css';

const IconButton = props => (
  <div
    className={`IconButton${props.active ? ' Active' : ''}`}
    onClick={props.clicked}
    id={props.id}
    data-test-id={props.dataTestId}>
    <i className={props.type}></i>
  </div>
);

export default IconButton;
