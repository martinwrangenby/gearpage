import React from 'react';
import './App.css';
import db from './assets/db';
import AddInstrumentForm from './components/AddInstrumentForm/AddInstrumentForm';
import GearList from './components/GearListReactTable/GearListReactTable';

const App = () => {
  const [instruments, setInstruments] = React.useState(db.instruments);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
    ],
    []
  )

  return (
    <div className="App">
      <AddInstrumentForm 
        instruments={instruments}
        setInstruments={setInstruments}/>

      <GearList
        columns={columns}
        data={instruments}/>
    </div>
  );
}

export default App;
