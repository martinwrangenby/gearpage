import React from 'react';
import './ToolbarMenu.css';

const ToolbarMenu = ({ handleMenuChoice }) => (
  <nav
    className='ToolbarMenu'
    id='menuContent'
    aria-label='Toolbar menu'
    role='menu'
  >
    <button
      type='button'
      role='menuitem'
      onClick={() => handleMenuChoice('settings')}
      className='ToolbarMenuItem'
    >
      Settings
    </button>
    <button
      type='button'
      role='menuitem'
      onClick={() => handleMenuChoice('logout')}
      className='ToolbarMenuItem'
    >
      Sign out
    </button>
  </nav>
);

export default ToolbarMenu;
