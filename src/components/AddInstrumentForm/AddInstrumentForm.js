import React from 'react';
import Button from '../UI/Button/Button'
import axios from '../../axios';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import './AddInstrumentForm.css'

// TODO: Add security on input form
const addInstrumentForm = props => {
 
  const handleSubmit = event => {
    console.log('yo!')
    if (event.target.type.value && event.target.name.value) {
      const data = {
          name: event.target.name.value,
          type: event.target.type.value,
          description: event.target.description.value,
        }
      axios.post('/gear.json', data)
        .then(res => {
          console.log(res);
          //TODO: not entierly sure if it's better to add the instrument like this or do another db fetch in InstrumentList instead...
          props.addInstrument(Object.assign({id: res.data.name}, data));
          props.closeModal();
        })
        .catch(err => {
          props.closeModal();
        })
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

export default WithErrorHandler(addInstrumentForm, axios);
