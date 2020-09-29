import React from 'react';

// TODO: Add security on input form
const AddInstrumentForm = props => {
  const [newInstrument, setNewInstrument] = React.useState({
    name: '',
    type: '',
    id: null
  });

  const handleChange = event => {
    const value = event.target.value;

    setNewInstrument({
      ...newInstrument,
      [event.target.name]: value,
      id: Math.floor(Math.random() * 1000) // ugly hack just to get a id for the instrumentlist
    });
  };
 
  const handleSubmit = event => {
    if (newInstrument.type === '') {
      alert('You need to select an instrument type')
    }
    else if (newInstrument) {
      props.setInstruments(props.instruments.concat(newInstrument));
      console.log(newInstrument);
      setNewInstrument({
        name: '',
        type: ''
      });
    }
 
    event.preventDefault();
  };

  const instrumentTypes = ['amp', 'guitar', 'bass', 'effect'];

  const selectSection = instrumentTypes.map((type) => {
    return (
    <option key={type} value={type}>{type}</option>
    )
  })

  return (
    <form onSubmit={handleSubmit}>
        <select native name='type' value={newInstrument.type} onChange={handleChange}>
        <option aria-label="None" value="" />
          {selectSection}
        </select>
        <input name='name' type="text" value={newInstrument.name} onChange={handleChange} />
        <button type="submit">Add New Instrument</button>
    </form>
  )
}

export default AddInstrumentForm;
