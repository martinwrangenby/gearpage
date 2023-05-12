import React from 'react';
import Button from '../../UI/Button/Button';
import './ConfirmChoice.css';

const ConfirmChoice = ({ title, confirm, reject }) => (
  <React.Fragment>
    <h2 className='ConfirmTitle'>{title}</h2>
    <h4>Are you sure?</h4>
    <Button buttonType='Danger' dataTestId='confirm' clicked={confirm}>
      Yes
    </Button>
    <Button dataTestId='reject' clicked={reject}>
      No
    </Button>
  </React.Fragment>
);

export default ConfirmChoice;
