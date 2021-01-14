import React from 'react';
import Button from '../UI/Button/Button';
import instrumentTypes from '../../assets/gearTypes';

import './HandleInstrumentForm.css';

// TODO: Add security on input form
const HandleInstrumentForm = props => {

  const handleSubmit = event => {
    if (event.target.type.value && event.target.name.value) {
      const data = {
        name: event.target.name.value,
        type: event.target.type.value,
        description: event.target.description.value,
      };
      props.submitInstrument(data);
    } else {
      alert('you must specify both instrument type and name');
    }
    event.preventDefault();
  };

  const selectSection = props.instrument
    ? <select name='type' id='type' data-test-id='formGearType' defaultValue={props.instrument.type}>
      {instrumentTypes.map((type) => {
        return <option key={type} value={type}>{type}</option>;
      })}
    </select>
    : <select name='type' id='type' data-test-id='formGearType' defaultValue=''>
      <option value='' disabled>Instrument type</option>
      {instrumentTypes.map((type) => {
        return <option key={type} value={type}>{type}</option>;
      })}
    </select>;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        {selectSection}
        <input
          name='name'
          id='name'
          type="text"
          data-test-id='formGearName'
          defaultValue={props.instrument ? props.instrument.name : ''}
          placeholder='Instrument name'/>
        <textarea
          rows='4'
          name='description'
          id='description'
          type="text"
          data-test-id='formGearDescription'
          defaultValue={props.instrument ? props.instrument.description : ''}
          placeholder='Description (optional)'/>
        <Button buttonType='Success' type='submit' dataTestId='submitGearFormButton'>
          {props.instrument ? 'Update' : 'Add'}
        </Button>
        <Button buttonType='Danger' type='reset' clicked={props.closeModal}>Cancel</Button>
      </form>
    </React.Fragment>
  );
};

export default HandleInstrumentForm;
