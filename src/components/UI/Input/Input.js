import React from 'react';

import './Input.css';

const Input = props => {
  let inputContent = null;
  const classes = ['InputElement'];

  if(props.inValid && props.touched) {
    classes.push('Invalid');
  }

  switch(props.elementType) {
  case('input'):
    inputContent = <input
      className={classes.join(' ')}
      value={props.value}
      onChange={props.changed}
      data-test-id={props.dataTestId}
      { ...props.elementConfig }/>;
    break;
  case('textarea'):
    inputContent = <textarea
      className={classes.join(' ')}
      value={props.value}
      onChange={props.changed}
      data-test-id={props.dataTestId}
      { ...props.elementConfig }/>;
    break;
  case('select'):
    inputContent = props.value
      ? (
        <select
          className={classes.join(' ')}
          value={props.value}
          onChange={props.changed}
          data-test-id={props.dataTestId}>
          {props.elementConfig.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
      : (
        <select
          className={classes.join(' ')}
          value={props.value}
          onChange={props.changed}
          data-test-id={props.dataTestId}>
          <option value='' disabled>Instrument type</option>
          {props.elementConfig.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    break;
  default:
    inputContent = <input
      className={classes.join(' ')}
      value={props.value}
      onChange={props.changed}
      data-test-id={props.dataTestId}
      { ...props.elementConfig }/>;
    break;
  }
  return (
    <React.Fragment>
      { inputContent }
    </React.Fragment>
  );
};

export default Input;
