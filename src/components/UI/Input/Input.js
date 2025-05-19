import React from 'react';

import './Input.css';

const Input = ({
  inValid = false,
  touched = false,
  elementType = 'input',
  value = undefined,
  changed = () => {console.error(`no onChange handler function provided to ${elementType} component`);},
  elementConfig = {},
  label = '',
}) => {
  let inputContent = null;
  const classes = ['InputElement'];

  if(inValid && touched) classes.push('Invalid');

  if(elementType === 'select') {
    if (!elementConfig.options) {
      console.error('Can not generate <select> element without passing options (elementConfig.options)');
      return null;
    }
    const placeholderOption = value ? null : <option value='' disabled>{elementConfig.placeholder}</option>;
    inputContent = <select
      aria-label={label}
      className={classes.join(' ')}
      value={value}
      onChange={changed}>
      {placeholderOption}
      {elementConfig.options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>;
  } else {
    const CustomTag = elementType;
    inputContent = <CustomTag
      aria-label={label}
      className={classes.join(' ')}
      value={value}
      onChange={changed}
      { ...elementConfig }/>;
  }
  return inputContent;
};

export default Input;
