import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
          <Switch>
            <Route path='/gearitem' component={InstrumentDetails}/>
            <Route path='/settings' component={Settings} />
            <Route path='/' component={InstrumentList}/>
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
