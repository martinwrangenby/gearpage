import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';

const Layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <main className='Content'>
      {props.children}
    </main>
  </React.Fragment>
)

export default Layout;
