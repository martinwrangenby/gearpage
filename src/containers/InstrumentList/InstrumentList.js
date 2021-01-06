import React from 'react';
import db from '../../assets/db';
import useSortedData from '../../hooks/useSortedData';
import AddInstrumentForm from '../../components/AddInstrumentForm/AddInstrumentForm';
import InstrumentTable from '../../components/InstrumentTable/InstrumentTable';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import './InstrumentList.css';

const InstrumentList = () => {
  const [instruments, setInstruments] = React.useState(db.instruments);
  const [addingInstrument, setAddingInstrument] = React.useState(false);
  
  const { sortedItems, requestSort, sortConfig } = useSortedData(instruments);

  const instrumentTypes = ['amp', 'guitar', 'bass', 'effect'];
  
  const addInstrument = (instrument) => {
    setInstruments(instruments.concat(instrument));
    closeAddInstrumentModal();
  }

  const closeAddInstrumentModal = () => setAddingInstrument(false);

  return (
    <div className='InstrumentList'>
      <Modal show={addingInstrument} modalClosed={closeAddInstrumentModal}>
        <AddInstrumentForm
          instrumentTypes={instrumentTypes}
          addInstrument={addInstrument}
          closeModal={ () => setAddingInstrument(false)}/>
      </Modal>
      <Button clicked={setAddingInstrument}>
        Add New Instrument
      </Button>
      <InstrumentTable
        instruments={sortedItems}
        sort={requestSort}
        sortOrder={sortConfig}/>
    </div>
  );
}

export default InstrumentList;