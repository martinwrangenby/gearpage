import React from 'react';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import './InstrumentDetails.css';

const InstrumentDetails = (props) => {
  const [ instrument, setInstrument ] = React.useState(null);
  const [ error, setError ] = React.useState(false);
  
  React.useEffect(() => { 
    const query = new URLSearchParams(props.location.search);
    for (let param of query.entries()) {
      if (param[0] === 'id') {
        axios.get(`/gear/${param[1]}.json`)
          .then(res => {
            if (res.data) {
              setInstrument(res.data);
            } else {throw new Error('Gear item couldn\'t be found in database')}
          })
          .catch(err => {
            setError(err)
          });
      }
    }

  },[props.location.search])

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
      {content}
      <Button clicked={props.history.goBack}>
        Back
      </Button>
    </React.Fragment>
  )
}

export default WithErrorHandler(InstrumentDetails, axios);
