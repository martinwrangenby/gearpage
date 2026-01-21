import gearTypes from './gearTypes';


const gearFormRules = {
  name: {
    label: 'Name',
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
  },
  type: {
    label: 'Type',
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
  },
  description: {
    label: 'Description',
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
  },
  price: {
    label: 'Price',
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
  },
  sold: {
    label: 'Sold',
    elementType: 'input',
    elementConfig: {
      type: 'checkbox',
    },
    value: false,
    rules: {
      mandatory: false,
    },
    valid: true,
    touched: false,
  },
  soldPrice: {
    label: 'Sold Price',
    elementType: 'input',
    elementConfig: {
      type: 'number',
      placeholder: 'Sold price',
    },
    value: '',
    rules: {
      mandatory: false, // This is set dynamically in form logic
    },
    valid: true,
    touched: false,
  },
};

export default gearFormRules;
