import React from 'react';

import './Input.css';

const Input = props => {
  let inputContent = null;
  const classes = ['InputElement'];

  if(props.inValid && props.touched) classes.push('Invalid');

  if(['input', 'textarea'].includes(props.elementType)) {
    inputContent = <props.elementType
      className={classes.join(' ')}
      value={props.value}
      onChange={props.changed}
      data-test-id={props.dataTestId}
      { ...props.elementConfig }/>;
  } else if(props.elementType === 'select') {
    const placeholderOption = props.value ? null : <option value='' disabled>{props.elementConfig.placeholder}</option>;
    inputContent = <select
      className={classes.join(' ')}
      value={props.value}
      onChange={props.changed}
      data-test-id={props.dataTestId}>
      {placeholderOption}
      {props.elementConfig.options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>;
  }
  return inputContent;
};

export default Input;
