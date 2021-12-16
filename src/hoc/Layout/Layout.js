import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';

const Layout = (props) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Toolbar showMenu={menuOpen} toggleMenu={setMenuOpen}/>
      <main className='Content'>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
