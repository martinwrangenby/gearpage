import React from 'react';
import './Switch.css';

const Switch = props => (
  <label
    className={['Switch', props.orientation].join(' ')}
    style={props.centered ? { margin: 'auto' } : null}>
    <input type='checkbox' defaultChecked={props.activated} onClick={props.clicked}/>
    <span className={['Slider', props.orientation].join(' ')}></span>
  </label>
);

export default Switch;
