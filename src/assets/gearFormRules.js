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
      placeholder: 'Gear type',
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
  price: {
    elementType: 'input',
    elementConfig: {
      placeholder: 'Price',
      type: 'number',
    },
    value: '',
    rules: {
      mandatory: false,
    },
    valid: true,
    dataTestId: 'formGearPrice',
  },
};

export default gearFormRules;
