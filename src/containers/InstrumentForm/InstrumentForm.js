import React from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Switch from '../../components/UI/Switch/Switch';
import gearFormRules from '../../assets/gearFormRules';
import { checkFieldValidity } from '../../assets/validation';
import './InstrumentForm.css';

const InstrumentForm = ({ instrument, submitInstrument, closeModal }) => {

  const [formContent, setFormContent] = React.useState(() => JSON.parse(JSON.stringify(gearFormRules)));
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

      const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      updatedFormElement.value = newValue;
      updatedFormElement.touched = true;

      // If sold is toggled, dynamically update soldPrice rules
      if (identifier === 'sold') {
        const soldPriceEl = { ...updatedForm.soldPrice };
        soldPriceEl.rules = { ...soldPriceEl.rules, mandatory: newValue };
        soldPriceEl.valid = checkValidity(soldPriceEl.value, soldPriceEl.rules);
        updatedForm.soldPrice = soldPriceEl;
      }

      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.rules);
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
        {formElementsArray.map(formElement => {
          if (formElement.id === 'soldPrice' && !formContent.sold.value) {
            return null;
          }

          // Custom rendering for sold switch
          if (formElement.id === 'sold') {
            return (

              <div className="SoldContent" key={formElement.id}>
                <span>{formElement.config.label}</span>
                <Switch
                  label={formElement.config.label}
                  activated={formElement.config.value}
                  orientation='horizontal'
                  clicked={(e) => handleInputChange(e, formElement.id)}
                />
                {formContent.sold.value && (
                  <input
                    className="SoldPriceInput"
                    type="number"
                    placeholder="Sold Price"
                    value={formContent.soldPrice.value}
                    onChange={(e) => handleInputChange(e, 'soldPrice')}
                  />
                )}
              </div>

            );
          }
          // Sold price is conditionally rendered above
          if (formElement.id === 'soldPrice') return null;

          return (
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
          );
        })}
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
