import React from 'react';
import './ToolbarMenu.css';

const ToolbarMenu = ({ handleMenuChoice }) => (
  <div className='ToolbarMenu' id='menuContent'>
    <p
      style={{ margin: 'auto', cursor: 'pointer' }}
      data-testid='toolbarMenuSettings'
      onClick={() => handleMenuChoice('settings')}>
      Settings
    </p>
    <p
      style={{ margin: 'auto', cursor: 'pointer' }}
      data-testid='toolbarMenuLogout'
      onClick={() => handleMenuChoice('logout')}>
      Sign out
    </p>
  </div>
);

export default ToolbarMenu;
