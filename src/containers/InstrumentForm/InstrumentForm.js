import React from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import gearFormRules from '../../assets/gearFormRules';
import { checkFieldValidity } from '../../assets/validation';

const InstrumentForm = ({ instrument, submitInstrument, closeModal }) => {

  const [formContent, setFormContent] = React.useState(gearFormRules);
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (instrument) {
      setFormContent(prevFormContent => {
        const updatedFormContent = { ...prevFormContent };
        Object.keys(instrument).forEach(identifier => {
          if (identifier !== 'id') {
            const updatedFormElement = { ...updatedFormContent[identifier] };
            updatedFormElement.value = instrument[identifier];
            updatedFormElement.valid = true;
            updatedFormContent[identifier] = updatedFormElement;
          }
        });
        return updatedFormContent;
      });
    }
  }, [instrument]);

  const checkValidity = (value, rules) => checkFieldValidity(value, rules);

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

    const formSubmitData = {};
    for (const key in formContent) {
      formSubmitData[key] = formContent[key].value;
    }
    submitInstrument(formSubmitData);
  };

  const formElementsArray = [];
  for (const key in formContent) {
    formElementsArray.push({
      id: key,
      config: formContent[key],
    });
  }
  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        {formElementsArray.map(formElement => (
          <Input
            label={formElement.config?.label}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => handleInputChange(event, formElement.id)}
          />
        ))}
      </form>
      <Button
        disabled={!formValid}
        buttonType='Success'
        clicked={handleSubmit}>
        {instrument ? 'Update' : 'Add'}
      </Button>
      <Button
        buttonType='Danger'
        clicked={closeModal}>Cancel
      </Button>
    </>
  );
};

export default InstrumentForm;
