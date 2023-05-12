import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '../../UI/IconButton/IconButton';
import ToolbarMenu from './ToolbarMenu/ToolbarMenu';
import Transition from '../../../hoc/Transition/Transition';
import './Toolbar.css';

const Toolbar = ({ showMenu, toggleMenu, logout }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (showMenu) document.addEventListener('mousedown', handleCloseMenuClick);
    return () => document.removeEventListener('mousedown', handleCloseMenuClick);
  });

  const handleMenuChoice = (choice) => {
    if (choice === 'settings') navigate('/settings');
    if (choice === 'logout') logout();
    toggleMenu(false);
  };

  const handleCloseMenuClick = event => {
    if (!document.getElementById('menuButton').contains(event.target) &&
      !document.getElementById('menuContent').contains(event.target)) toggleMenu(false);
  };

  return (
    <header className='Toolbar'>
      <div className='ToolbarContent'>
        <IconButton
          type='fa fa-bars'
          id='menuButton'
          active={showMenu}
          clicked={() => toggleMenu(!showMenu)}
          dataTestId='toolbarMenuButton'/>
        <div className='ToolbarMenuContainer'>
          <Transition show={showMenu}>
            <ToolbarMenu handleMenuChoice={handleMenuChoice}/>
          </Transition>
        </div>
        <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          GEAR PAGE
        </NavLink>
      </div>
    </header>
  );
};

export default Toolbar;
