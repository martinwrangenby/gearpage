import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => (
  <header className='Toolbar'>
    <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
      GEAR PAGE
    </NavLink>
  </header>
)

export default Toolbar;
