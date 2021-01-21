import React from 'react';
import useSortedData from '../../hooks/useSortedData';
import InstrumentForm from '../InstrumentForm/InstrumentForm';
import InstrumentTable from '../../components/InstrumentTable/InstrumentTable';
import InstrumentListActions from './InstrumentListActions/InstrumentListActions';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import gearTypes from '../../assets/gearTypes';

import './InstrumentList.css';

const InstrumentList = () => {
  const [instruments, setInstruments] = React.useState([]);
  const [gearFilter, setGearFilter] = React.useState(gearTypes);
  const [addingInstrument, setAddingInstrument] = React.useState(false);
  const [loading, setLoading ] = React.useState(true);
  const [ error, setError ] = React.useState(false);
  React.useEffect(() => {
    axios.get('/gear.json')
      .then(res => {
        setLoading(false);
        if (res.data) {
          const fetchedGear = [];
          for (const key in res.data) {
            fetchedGear.push({
              ...res.data[key],
              id: key,
            });
          }
          setInstruments(fetchedGear);
        }
      })
      .catch(err => {
        setError(err);
      });
  },[]);

  const updateGearFilter = (instrumentType) => {
    gearFilter.includes(instrumentType)
      ? setGearFilter(gearFilter.filter(item => item !== instrumentType))
      : setGearFilter([instrumentType, ...gearFilter]);
  };

  const addInstrument = (instrument) => {
    axios.post('/gear.json', instrument)
      .then(res => {
        setInstruments(instruments.concat(Object.assign({ id: res.data.name }, instrument)));
      })
      .catch(err => {
        setError(err);
      });
    setAddingInstrument(false);
  };

  const { sortedItems, requestSort, sortConfig } = useSortedData(instruments);
  let instrumentTable = <Spinner />;
  //TODO: not very pretty... perhaps find a more elegant solution...
  if (instruments.length > 0) {
    instrumentTable = (
      <React.Fragment>
        <InstrumentListActions
          addInstrument={setAddingInstrument}
          filterGear={updateGearFilter}/>
        <InstrumentTable
          filter={gearFilter}
          instruments={sortedItems}
          sort={requestSort}
          sortOrder={sortConfig}/>
      </React.Fragment>
    );
  } else if (error) {
    instrumentTable = <h4>{error.message}</h4>;
  } else if (!loading) {
    instrumentTable = <h3>No Gear? get started adding already!</h3>;
  }

  return (
    <div className='InstrumentList'>
      <Modal show={addingInstrument} modalClosed={() => setAddingInstrument(false)}>
        <InstrumentForm
          submitInstrument={addInstrument}
          closeModal={() => setAddingInstrument(false)}/>
      </Modal>
      {instrumentTable}
    </div>
  );
};

export default WithErrorHandler(InstrumentList, axios);
