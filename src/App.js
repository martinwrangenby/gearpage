import React from 'react';
import './App.css';
import db from './assets/db';
import useSortedData from './hooks/useSortedData';
import AddInstrumentForm from './components/AddInstrumentForm/AddInstrumentForm';
import InstrumentList from './components/InstrumentList/InstrumentList';

const App = () => {
  const [instruments, setInstruments] = React.useState(db.instruments);

  const { sortedItems, requestSort, sortConfig } = useSortedData(instruments);

  return (
    <div className="App">
      <AddInstrumentForm 
        instruments={instruments}
        setInstruments={setInstruments}/>

      <InstrumentList
        instruments={sortedItems}
        sort={requestSort}
        sortOrder={sortConfig}/>
    </div>
  );
}

export default App;
