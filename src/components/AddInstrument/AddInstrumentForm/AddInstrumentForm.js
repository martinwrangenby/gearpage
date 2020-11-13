import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

// TODO: read up on makeStyles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// TODO: Add security on input form
const AddInstrumentForm = props => {
  const classes = useStyles();
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
      newInstrument.name = newInstrument.name.charAt(0).toUpperCase() + newInstrument.name.slice(1)
      props.setInstruments(props.instruments.concat(newInstrument));
      console.log(newInstrument);
      setNewInstrument({
        name: '',
        type: ''
      });
      props.toggleOpen(false);
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
      <FormControl className={classes.formControl}>
        <InputLabel>Gear type</InputLabel>
        <Select native name='type' value={newInstrument.type} onChange={handleChange}>
        <option aria-label="None" value="" />
          {selectSection}
        </Select>
        <TextField name='name' type="text" label="Name" value={newInstrument.name} onChange={handleChange} />
        <Button type="submit">Add New Instrument</Button>
      </FormControl>
    </form>
  )
}

export default AddInstrumentForm;
