import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '../UI/Button/Button';
import db from '../../assets/db';

import './InstrumentDetails.css';

const InstrumentDetails = () => {

  let queryId = '';
  const location = useLocation();
  const history = useHistory();
  
  const query = new URLSearchParams(location.search);
  for (let param of query.entries()) {
    if (param[0] === 'id') {
      queryId = param[1];
    }
  }

  // TODO: as of now, I'm only using the static db json as a dummy DB
  // When there's a real DB in place, there should be a get call to the DB instead of this line below
  const instrument = db.instruments.find(instrument => instrument.id === parseInt(queryId));
  
  let content = <h1>Couldn't find instrument in db</h1>

  if (instrument) {
    content = (
      <React.Fragment>
        <h1>{instrument.name}</h1>
        <p>{instrument.description}</p>
      </React.Fragment>
    )
  }
  return (
    <div className='InstrumentDetails'>
      {content}
      <Button clicked={history.goBack}>
        Back
      </Button>
    </div>
  )
}

export default InstrumentDetails;
