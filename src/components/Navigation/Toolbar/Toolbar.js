import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '../../UI/IconButton/IconButton';
import ToolbarMenu from './ToolbarMenu/ToolbarMenu';
import './Toolbar.css';

const Toolbar = (props) => {
  React.useEffect(() => {
    if (props.showMenu) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const handleClick = event => {
    if (!document.getElementById('menuButton').contains(event.target) &&
      !document.getElementById('menuContent').contains(event.target)) {
      props.toggleMenu(false);
    }
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
        {props.showMenu ? <ToolbarMenu /> : ''}
      </div>
    </header>
  );
};

export default Toolbar;
