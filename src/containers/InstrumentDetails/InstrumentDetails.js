import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, off, set, remove } from 'firebase/database';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import InstrumentForm from '../InstrumentForm/InstrumentForm';
import ConfirmChoice from '../../components/Navigation/ConfirmChoice/ConfirmChoice';
import Spinner from '../../components/UI/Spinner/Spinner';

const InstrumentDetails = ({ userId }) => {
  const [ instrument, setInstrument ] = React.useState(null);
  const [ editingInstrument, setEditingInstrument ] = React.useState(false);
  const [ deletingInstrument, setDeletingInstrument ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const db = getDatabase();

  React.useEffect(() => {
    const id = new URLSearchParams(location.search).get('id');
    const databaseRef = ref(db, `/users/${userId}/gear/${id}`);
    onValue(databaseRef, snapshot => {
      const data = snapshot.val();
      if (data) setInstrument({ id, ...data });
      else setError(new Error('Gear item couldn\'t be found in database'));
    },
    (err) => navigate('/login') // TODO: when adding id specific db path, investigate if this should be tweaked if loggedin user tries to get other user's stuff...
    );
    return () => off(databaseRef);
  },[location.search, db, navigate, userId]);

  const deleteInstrument = () => {
    remove(ref(db, `/users/${userId}/gear/${instrument.id}`),);
    navigate('/', { replace: true });
  };

  const updateInstrument = (data) => {
    set(ref(db, `/users/${userId}/gear/${instrument.id}`), data);
    setEditingInstrument(false);
  };

  let content = <Spinner />;
  if (error) {
    content = (
      <>
        <Modal>
          <h3>
            {error.message}
          </h3>
          <Button clicked={() => navigate('/')}>
              Back
          </Button>
        </Modal>
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
        <div className={`PageContentBox ${instrument.type}`} data-testid='gearDetailsContentBox'>
          <h1 className='PageContentHeader' data-testid='gearDetailsName'>{instrument.name}</h1>
          <p data-testid='gearDetailsDescription'>
            {instrument.description}
          </p>
          { instrument.price
            ? <p data-testid='price'>
                Price: {instrument.price}
            </p> : null }
        </div>
        <Modal show={deletingInstrument} modalClosed={() => setDeletingInstrument(false)}>
          <ConfirmChoice title={`Delete ${instrument.name}`} confirm={deleteInstrument} reject={() => setDeletingInstrument(false)}/>
        </Modal>
        <Button clicked={() => navigate(-1)}>
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

export default InstrumentDetails;
