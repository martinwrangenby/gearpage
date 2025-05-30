import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, off, update, remove } from 'firebase/database';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import InstrumentForm from '../InstrumentForm/InstrumentForm';
import ConfirmChoice from '../../components/Navigation/ConfirmChoice/ConfirmChoice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useAuth } from '../../hoc/Context/AuthContext';
import { validateInstrumentData } from '../../assets/validation';
import gearFormRules from '../../assets/gearFormRules';

const InstrumentDetails = () => {
  const { user } = useAuth();
  const { uid } = user;
  const [ instrument, setInstrument ] = React.useState(null);
  const [ editingInstrument, setEditingInstrument ] = React.useState(false);
  const [ deletingInstrument, setDeletingInstrument ] = React.useState(false);
  const [ error, setError ] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const db = getDatabase();

  React.useEffect(() => {
    const id = new URLSearchParams(location.search).get('id');
    const databaseRef = ref(db, `/users/${uid}/gear/${id}`);
    onValue(databaseRef, snapshot => {
      const data = snapshot.val();
      if (data) setInstrument({ id, ...data });
      else setError(new Error('Gear item couldn\'t be found in database'));
    },
    (err) => setError(err)
    );
    return () => off(databaseRef);
  },[location.search, db, navigate, uid]);

  const deleteInstrument = () => {
    remove(ref(db, `/users/${uid}/gear/${instrument.id}`),);
    navigate('/', { replace: true });
  };

  const updateInstrument = (data) => {
    const { isValid, errors } = validateInstrumentData(data, gearFormRules);
    if (!isValid) {
      setError(errors);
      return;
    }
    setEditingInstrument(false);
    update(ref(db, `/users/${uid}/gear/${instrument.id}`), data)
      .catch(err => setError(err));
  };

  let content = <Spinner />;
  if (error) {
    const errorMessages = typeof error === 'object' && !('message' in error)
      ? Object.values(error)
      : [error.message || String(error)];

    content = (
      <Modal title='Error'>
        {errorMessages.map((msg, index) => (
          <h4 key={index}>{msg}</h4>
        ))}
        <Button clicked={() => setError(null)}>
          Back
        </Button>
      </Modal>
    );
  }
  if (instrument) {
    content = (
      <>
        <Modal
          show={editingInstrument}
          modalClosed={() => setEditingInstrument(false)}
          title={`Edit ${instrument.name}`}>
          <InstrumentForm
            instrument={instrument}
            submitInstrument={updateInstrument}
            closeModal={() => setEditingInstrument(false)}/>
        </Modal>
        <div className={'PageContentBox'}>
          <h1 className='PageContentHeader'>{instrument.name}</h1>
          <p>
            {instrument.description}
          </p>
          { instrument.price
            ? <p>
                Price: {instrument.price} kr
            </p> : null }
        </div>
        <Modal
          show={deletingInstrument}
          modalClosed={() => setDeletingInstrument(false)}
          title={`Delete ${instrument.name}`}>
          <ConfirmChoice confirm={deleteInstrument} reject={() => setDeletingInstrument(false)}/>
        </Modal>
        <Button clicked={() => navigate(-1)}>
        Back
        </Button>
        <Button clicked={setEditingInstrument}>
        Edit
        </Button>
        <Button buttonType='Danger' clicked={setDeletingInstrument}>
        Delete
        </Button>
      </>
    );
  }
  return content;
};

export default InstrumentDetails;
