import React from 'react';
import './IconButton.css';

const IconButton = props => (
  <button
    type='button'
    className={`IconButton${props.active ? ' Active' : ''}`}
    onClick={props.clicked}
    id={props.id}
    aria-label={props.label}>
    <i className={props.type}></i>
  </button>
);

export default IconButton;
