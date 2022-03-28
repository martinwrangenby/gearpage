import React from 'react';
import './ToolbarMenu.css';

const ToolbarMenu = ({ handleMenuChoice }) => (
  <div className='ToolbarMenu' id='menuContent'>
    <p
      style={{ margin: 'auto', cursor: 'pointer' }}
      data-test-id='toolbarMenuSettings'
      onClick={() => handleMenuChoice('settings')}>
      Settings
    </p>
    <p
      style={{ margin: 'auto', cursor: 'pointer' }}
      data-test-id='toolbarMenuLogout'
      onClick={() => handleMenuChoice('logout')}>
      Sign out
    </p>
  </div>
);

export default ToolbarMenu;
