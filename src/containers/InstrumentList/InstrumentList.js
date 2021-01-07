import React from 'react';
import useSortedData from '../../hooks/useSortedData';
import AddInstrumentForm from '../../components/AddInstrumentForm/AddInstrumentForm';
import InstrumentTable from '../../components/InstrumentTable/InstrumentTable';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import './InstrumentList.css';

const InstrumentList = () => {
  const [instruments, setInstruments] = React.useState([]);
  const [addingInstrument, setAddingInstrument] = React.useState(false);
  const [loading, setLoading ] = React.useState(true);
  const [ error, setError ] = React.useState(false);
  
  React.useEffect(() => {
    axios.get('/gear.json')
      .then(res => {
        setLoading(false);
        if (res.data) {
          const fetchedGear = [];
          for (let key in res.data) {
            fetchedGear.push({
              ...res.data[key],
              id: key
            })
          }
          setInstruments(fetchedGear);
        }
      })
      .catch(err => {
        setError(err);
      })
  },[]);

  const { sortedItems, requestSort, sortConfig } = useSortedData(instruments);
  // TODO: more slick solution to supported gear types?
  const instrumentTypes = ['amp', 'guitar', 'bass', 'effect'];
  
  const addInstrument = (instrument) => {
    setInstruments(instruments.concat(instrument));
    closeAddInstrumentModal();
  }
  
  const closeAddInstrumentModal = () => setAddingInstrument(false);
  
  let instrumentTable = <Spinner />;
  //TODO: not very pretty... perhaps find a more elegant solution...
  if (instruments.length > 0) {
    instrumentTable = <InstrumentTable
    instruments={sortedItems}
    sort={requestSort}
    sortOrder={sortConfig}/>
  } else if (error) {
    instrumentTable = <h4>{error.message}</h4>
  }
  else if (!loading) {
    instrumentTable = <h3>No Gear? get started adding already!</h3>
  }

  return (
    <div className='InstrumentList'>
      <Modal show={addingInstrument} modalClosed={closeAddInstrumentModal}>
        <AddInstrumentForm
          instrumentTypes={instrumentTypes}
          addInstrument={addInstrument}
          closeModal={() => setAddingInstrument(false)}/>
      </Modal>
      <Button clicked={setAddingInstrument}>
        Add New Instrument
      </Button>
      {instrumentTable}
    </div>
  );
}

export default WithErrorHandler(InstrumentList, axios);