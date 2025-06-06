import React from 'react';
import './Switch.css';

const Switch = ({
  orientation = '',
  centered = false,
  activated = false,
  label='',
  clicked = () => {console.error('no onClick handler function provided to the Switch component');},
}) => (
  <label
    className={['Switch', orientation].join(' ')}
    style={centered ? { margin: 'auto' } : null}>
    <input
      type='checkbox'
      aria-label={label}
      defaultChecked={activated}
      onClick={clicked}/>
    <span className={['Slider', orientation].join(' ')}></span>
  </label>
);

export default Switch;
