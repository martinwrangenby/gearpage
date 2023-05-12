import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';

const Layout = (props) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
      <Toolbar
        showMenu={menuOpen}
        toggleMenu={setMenuOpen}
        logout={props.logout}/>
      <main className='Content'>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
