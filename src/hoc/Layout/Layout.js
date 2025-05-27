import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';

const Layout = ({ logout, children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
      <Toolbar
        showMenu={menuOpen}
        toggleMenu={setMenuOpen}
        logout={logout}/>
      <main className='Content'>
        {children}
      </main>
    </>
  );
};

export default Layout;
