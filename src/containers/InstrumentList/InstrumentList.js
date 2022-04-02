import React from 'react';
import { getDatabase, ref, onValue, push, off } from 'firebase/database';
import useSortedData from '../../hooks/useSortedData';
import InstrumentForm from '../InstrumentForm/InstrumentForm';
import InstrumentTable from '../../components/InstrumentTable/InstrumentTable';
import InstrumentListActions from './InstrumentListActions/InstrumentListActions';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import gearTypes from '../../assets/gearTypes';

import './InstrumentList.css';

const InstrumentList = ({ userId }) => {
  const [instruments, setInstruments] = React.useState([]);
  const [gearFilter, setGearFilter] = React.useState(JSON.parse(localStorage.getItem('gearTypesFilter')) || gearTypes);
  const [addingInstrument, setAddingInstrument] = React.useState(false);
  const [loading, setLoading ] = React.useState(true);
  const [ error, setError ] = React.useState(false);
  const db = getDatabase();

  React.useEffect(() => {
    localStorage.setItem('gearTypesFilter', JSON.stringify(gearFilter));
    const databaseRef = ref(db, `/users/${userId}/gear`);
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedGear = [];
      for (const key in data) {
        fetchedGear.push({
          ...data[key],
          id: key,
        });
      }
      setInstruments(fetchedGear);
      setLoading(false);
    },
    (err) => {
      setError(err);
    }
    );
    return () => off(databaseRef);
  },[db, gearFilter, userId]);
  const updateGearFilter = (instrumentType) => {
    gearFilter.includes(instrumentType)
      ? setGearFilter(gearFilter.filter(item => item !== instrumentType))
      : setGearFilter([instrumentType, ...gearFilter]);
  };

  const resetGearFilter = () => setGearFilter(gearTypes);

  const addInstrument = (instrument) => {
    push(ref(db, `/users/${userId}/gear`), instrument);
    setAddingInstrument(false);
  };

  const { sortedItems, requestSort, sortConfig } = useSortedData(instruments);
  let instrumentTable = <Spinner />;
  //TODO: not very pretty... perhaps find a more elegant solution...
  if (instruments.length > 0) {
    instrumentTable = (
      <>
        <InstrumentListActions
          activeFilter={gearFilter}
          resetFilter={resetGearFilter}
          addInstrument={setAddingInstrument}
          updateFilter={updateGearFilter}/>
        <InstrumentTable
          filter={gearFilter}
          instruments={sortedItems}
          sort={requestSort}
          sortOrder={sortConfig}/>
      </>
    );
  } else if (error) {
    instrumentTable = <h4>{error.message}</h4>;
  } else if (!loading) {
    instrumentTable = (
      <>
        <h3>No Gear? get started adding already!</h3>
        <Button clicked={() => setAddingInstrument(true)} dataTestId='addNewInstrumentButton'>
          Add an instrument
        </Button>
      </>
    );
  }

  const addInstrumentModal = (
    <Modal show={addingInstrument} modalClosed={() => setAddingInstrument(false)}>
      <InstrumentForm
        submitInstrument={addInstrument}
        closeModal={() => setAddingInstrument(false)}/>
    </Modal>
  );

  return (
    <div className='InstrumentList'>
      {!loading ? addInstrumentModal : ''}
      {instrumentTable}
    </div>
  );
};

export default InstrumentList;
