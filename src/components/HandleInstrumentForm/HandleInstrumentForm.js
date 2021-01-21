import React from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import gearFormRules from '../../assets/gearFormRules';


// TODO: Add security on input form
const HandleInstrumentForm = props => {

  const [formContent, setFormContent] = React.useState(gearFormRules);
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (props.instrument) {
      setFormContent(prevFormContent => {
        const updatedFormContent = { ...prevFormContent };
        Object.keys(props.instrument).forEach(identifier => {
          if (identifier !== 'id') {
            const updatedFormElement = { ...updatedFormContent[identifier] };
            updatedFormElement.value = props.instrument[identifier];
            updatedFormElement.valid = true;
            updatedFormContent[identifier] = updatedFormElement;
          }
        });
        return updatedFormContent;
      });
    }
  }, [props.instrument]);

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.mandatory) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  };

  const handleInputChange = (event, identifier) => {
    if (event.target.value !== formContent[identifier].value) {
      const updatedForm = { ...formContent };
      const updatedFormElement = { ...updatedForm[identifier] };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.rules);
      updatedFormElement.touched = true;
      updatedForm[identifier] = updatedFormElement;
      let formIsValid = true;
      Object.keys(updatedForm).forEach((formItem) => {
        formIsValid = updatedForm[formItem].valid && formIsValid;
      });
      setFormContent(updatedForm);
      setFormValid(formIsValid);
    }
  };

  const handleSubmit = () => {
    let validSubmit = true;
    const data = {};
    Object.keys(formContent).forEach(identifier => {
      if (formContent[identifier].mandatory && formContent[identifier].value === '') {
        validSubmit = false;
      } else {
        data[identifier] = formContent[identifier].value;
      }
    });
    if (validSubmit) {
      props.submitInstrument(data);
    } else {
      alert('you must specify both instrument type and name');
    }
  };

  const formElementsArray = [];
  for (const key in formContent) {
    formElementsArray.push({
      id: key,
      config: formContent[key],
    });
  }
  return (
    <React.Fragment>
      <form onSubmit={(event) => event.preventDefault()}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => handleInputChange(event, formElement.id)}
            dataTestId={formElement.config.dataTestId}
          />
        ))}
      </form>
      <Button
        disabled={!formValid}
        buttonType='Success'
        clicked={handleSubmit}
        dataTestId='submitGearFormButton'>
        {props.instrument ? 'Update' : 'Add'}
      </Button>
      <Button
        buttonType='Danger'
        clicked={props.closeModal}>Cancel
      </Button>
    </React.Fragment>
  );
};

export default HandleInstrumentForm;
