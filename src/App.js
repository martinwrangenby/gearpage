import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import InstrumentList from './containers/InstrumentList/InstrumentList';
import InstrumentDetails from './containers/InstrumentDetails/InstrumentDetails';
import Settings from './containers/Settings/Settings';
import Layout from './hoc/Layout/Layout';
import './App.css';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Routes>
            <Route path='/gearitem' element={<InstrumentDetails/>}/>
            <Route path='/settings' element={<Settings/>} />
            <Route path='/' element={<InstrumentList/>}/>
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
