import React from 'react';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import HandleInstrumentForm from '../../components/HandleInstrumentForm/HandleInstrumentForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';

import './InstrumentDetails.css';

const InstrumentDetails = (props) => {
  const [ instrument, setInstrument ] = React.useState(null);
  const [ editingInstrument, setEditingInstrument ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  
  React.useEffect(() => { 
    const query = new URLSearchParams(props.location.search);
    for (let param of query.entries()) {
      if (param[0] === 'id') {
        axios.get(`/gear/${param[1]}.json`)
          .then(res => {
            if (res.data) {
              setInstrument({id: param[1], ...res.data});
            } else {throw new Error('Gear item couldn\'t be found in database')}
          })
          .catch(err => {
            setError(err)
          });
      }
    }

  },[props.location.search])

  const deleteInstrument = () => {
    axios.delete(`/gear/${instrument.id}.json`)
      .then(res => {
        console.log(res);
        props.history.replace('/');
      })
      .catch(err => {
        setError(err);
      })
  }

  const updateInstrument = (data) => {
    axios.put(`/gear/${instrument.id}.json`, data)
      .then(res => {
        setInstrument({id: instrument.id, ...res.data});
      })
      .catch(err => {
        setError(err);
      })
    setEditingInstrument(false);
  }

  let content = <Spinner />
  if (error) {
    content = <h4>{error.message}</h4>
  }
  if (instrument) {
    content = (
      <div className='InstrumentDetails'>
        <h1>{instrument.name}</h1>
        <p>{instrument.description}</p>
      </div>
    )
  }
  return (
    <React.Fragment>
      <Modal show={editingInstrument} modalClosed={() => setEditingInstrument(false)}>
        <HandleInstrumentForm
          instrument={instrument}
          submitInstrument={updateInstrument}
          closeModal={() => setEditingInstrument(false)}/>
      </Modal>
      {content}
      <Button clicked={props.history.goBack}>
        Back
      </Button>
      <Button clicked={setEditingInstrument}>
        Edit
      </Button>
      <Button buttonType='Danger' clicked={deleteInstrument}>
        Delete
      </Button>
    </React.Fragment>
  )
}

export default WithErrorHandler(InstrumentDetails, axios);
