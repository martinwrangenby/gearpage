import React from 'react';
import Button from '../../UI/Button/Button';
import './ConfirmChoice.css';

const ConfirmChoice = ({ confirm, reject }) => (
  <>
    <h4>Are you sure?</h4>
    <Button buttonType='Danger' clicked={confirm}>
      Yes
    </Button>
    <Button clicked={reject}>
      No
    </Button>
  </>
);

export default ConfirmChoice;
