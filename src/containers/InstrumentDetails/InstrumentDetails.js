import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import InstrumentForm from '../InstrumentForm/InstrumentForm';
import ConfirmChoice from '../../components/Navigation/ConfirmChoice/ConfirmChoice';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';

const InstrumentDetails = () => {
  const [ instrument, setInstrument ] = React.useState(null);
  const [ editingInstrument, setEditingInstrument ] = React.useState(false);
  const [ deletingInstrument, setDeletingInstrument ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const id = new URLSearchParams(location.search).get('id');
    axios.get(`/gear/${id}.json`)
      .then(res => {
        if (res.data) setInstrument({ id, ...res.data });
        else throw new Error('Gear item couldn\'t be found in database');
      })
      .catch(err => {
        setError(err);
      });
  },[location.search]);

  const deleteInstrument = () => {
    axios.delete(`/gear/${instrument.id}.json`)
      .then(res => {
        history.replace('/');
      })
      .catch(err => {
        setError(err);
      });
  };

  const updateInstrument = (data) => {
    axios.put(`/gear/${instrument.id}.json`, data)
      .then(res => {
        setInstrument({ id: instrument.id, ...res.data });
      })
      .catch(err => {
        setError(err);
      });
    setEditingInstrument(false);
  };

  let content = <Spinner />;
  if (error) {
    content = (
      <>
        <h4>
          {error.message}
        </h4>
        <Button clicked={history.goBack}>
            Back
        </Button>
      </>
    );
  }
  if (instrument) {
    // adding the type to the class name is primarily to help the e2e tests. When further developing, this should be indintifyable in some other way...
    content = (
      <>
        <Modal show={editingInstrument} modalClosed={() => setEditingInstrument(false)}>
          <InstrumentForm
            instrument={instrument}
            submitInstrument={updateInstrument}
            closeModal={() => setEditingInstrument(false)}/>
        </Modal>
        <div className={`PageContentBox ${instrument.type}`}>
          <h1 data-test-id='gearDetailsName'>{instrument.name}</h1>
          <p data-test-id='gearDetailsDescription'>{instrument.description}</p>
        </div>
        <Modal show={deletingInstrument} modalClosed={() => setDeletingInstrument(false)}>
          <ConfirmChoice title={`Delete ${instrument.name}`} confirm={deleteInstrument} reject={() => setDeletingInstrument(false)}/>
        </Modal>
        <Button clicked={history.goBack}>
        Back
        </Button>
        <Button clicked={setEditingInstrument} dataTestId='editInstrument'>
        Edit
        </Button>
        <Button buttonType='Danger' clicked={setDeletingInstrument} dataTestId='deleteInstrument'>
        Delete
        </Button>
      </>
    );
  }
  return content;
};

export default WithErrorHandler(InstrumentDetails, axios);
