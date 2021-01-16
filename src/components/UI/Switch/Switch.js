import React from 'react';
import './Switch.css';

const Switch = props => (
  <label className='Switch'>
    <input type='checkbox' defaultChecked={props.activated} onClick={props.clicked}/>
    <span className='Slider'></span>
  </label>
);

export default Switch;
