import React from 'react';
import Button from '../../UI/Button/Button';
import './ConfirmChoice.css';

const ConfirmChoice = props => (
  <React.Fragment>
    <h2 className='ConfirmTitle'>{props.title}</h2>
    <h4>Are you sure?</h4>
    <Button buttonType='Danger' dataTestId='confirm' clicked={props.confirm}>
      Yes
    </Button>
    <Button dataTestId='reject' clicked={props.reject}>
      No
    </Button>
  </React.Fragment>
);

export default ConfirmChoice;
