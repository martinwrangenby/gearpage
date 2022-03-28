import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '../../UI/IconButton/IconButton';
import ToolbarMenu from './ToolbarMenu/ToolbarMenu';
import './Toolbar.css';

const Toolbar = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (props.showMenu) document.addEventListener('mousedown', handleCloseMenuClick);
    return () => document.removeEventListener('mousedown', handleCloseMenuClick);
  });

  const handleMenuChoice = (choice) => {
    if (choice === 'settings') navigate('/settings');
    if (choice === 'logout') props.logout();
    props.toggleMenu(false);
  };

  const handleCloseMenuClick = event => {
    if (!document.getElementById('menuButton').contains(event.target) &&
      !document.getElementById('menuContent').contains(event.target)) props.toggleMenu(false);
  };

  return (
    <header className='Toolbar'>
      <div className='ToolbarContent'>
        <IconButton
          type='fa fa-bars'
          id='menuButton'
          active={props.showMenu}
          clicked={() => props.toggleMenu(!props.showMenu)}/>
        <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          GEAR PAGE
        </NavLink>
        {props.showMenu ? <ToolbarMenu handleMenuChoice={handleMenuChoice}/> : ''}
      </div>
    </header>
  );
};

export default Toolbar;
