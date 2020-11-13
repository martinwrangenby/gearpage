import React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import './App.css';
import db from './assets/db';
import AddInstrument from './components/AddInstrument/AddInstrument';
import GearList from './components/GearList/GearList';

const App = () => {
  const [instruments, setInstruments] = React.useState(db.instruments);
  const [showAddInstrumentForm, setShowInstrumentForm] = React.useState(false);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    }
  });
  console.log(showAddInstrumentForm)

  let addInstrumentForm = null;
  if (showAddInstrumentForm) {
    addInstrumentForm = (
      <AddInstrument 
        instruments={instruments}
        setInstruments={setInstruments}
        open={showAddInstrumentForm}
        toggleOpen={setShowInstrumentForm}/>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

        <div className="App">
          <Button onClick={() => setShowInstrumentForm(!showAddInstrumentForm)}>Add Instrument</Button>
          {addInstrumentForm}
          <GearList instruments={instruments}/>
        </div>


    </ThemeProvider>
  );
}

export default App;
