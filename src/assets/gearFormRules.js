import gearTypes from './gearTypes';


const gearFormRules = {
  name: {
    elementType: 'input',
    elementConfig: {
      placeholder: 'Name',
      type: 'text',
    },
    value: '',
    rules: {
      mandatory: true,
    },
    valid: false,
    touched: false,
    dataTestId: 'formGearName',
  },
  type: {
    elementType: 'select',
    elementConfig: {
      options: gearTypes,
    },
    value: '',
    rules: {
      mandatory: true,
    },
    valid: false,
    touched: false,
    dataTestId: 'formGearType',
  },
  description: {
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'Description',
      type: 'text',
    },
    value: '',
    rules: {
      mandatory: false,
    },
    valid: true,
    dataTestId: 'formGearDescription',
  },
};

export default gearFormRules;
