import React from 'react';
import Button from '../UI/Button/Button'

import './AddInstrumentForm.css'

// TODO: Add security on input form
const addInstrumentForm = props => {
 
  const handleSubmit = event => {
    if (event.target.type.value && event.target.name.value) {
      props.addInstrument({
        name: event.target.name.value,
        type: event.target.type.value,
        id: Math.floor(Math.random() * 1000), // ugly hack just to get a id for the instrumentlist
      });
    }
    else {
      alert('you must specify both instrument type and name');
    }
    event.preventDefault();
  };
  
  const selectSection = props.instrumentTypes.map((type) => {
    return (
    <option key={type} value={type}>{type}</option>
    )
  })

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <select name='type' id='type' defaultValue=''>
        <option value='' disabled>Instrument type</option>
          {selectSection}
        </select>
        <input name='name' id='name' type="text" placeholder='Instrument name'/>
        <textarea rows='4' name='description' id='description' type="text" placeholder='Description (optional)'/>
        <Button buttonType='Success' type='submit'>Add</Button>
        <Button buttonType='Danger' type='reset' clicked={props.closeModal}>Cancel</Button>
      </form>
    </React.Fragment>
  )
}

export default addInstrumentForm;
