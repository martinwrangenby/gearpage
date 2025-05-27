import React from 'react';
import './IconButton.css';

const IconButton = ({ active, clicked, id, label, type }) => (
  <button
    type='button'
    className={`IconButton${active ? ' Active' : ''}`}
    onClick={clicked}
    id={id}
    aria-label={label}>
    <i className={type}></i>
  </button>
);

export default IconButton;
