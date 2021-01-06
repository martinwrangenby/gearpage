import React from 'react';
import './App.css';
import InstrumentList from './containers/InstrumentList/InstrumentList';
import InstrumentDetails from './components/InstrumentDetails/InstrumentDetails';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const App = () => {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/gearitem' component={InstrumentDetails}/>
          <Route path='/' component={InstrumentList}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
