import React from 'react';
import { NavLink } from 'react-router-dom';
import './ToolbarMenu.css';

const ToolbarMenu = () => (
  <div className='ToolbarMenu' id='menuContent'>
    <NavLink to='/settings' style={{ textDecoration: 'none', color: 'inherit' }}>
      <p style={{ margin: 'auto' }}>Settings</p>
    </NavLink>
    <p style={{ margin: 'auto' }}>Sign out</p>
  </div>
);

export default ToolbarMenu;
