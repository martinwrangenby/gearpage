import React from 'react';
import Button from '../../UI/Button/Button';
import './ConfirmChoice.css';

const ConfirmChoice = ({ confirm, reject }) => (
  <>
    <h3>Are you sure?</h3>
    <Button buttonType='Danger' clicked={confirm}>
      Yes
    </Button>
    <Button clicked={reject}>
      No
    </Button>
  </>
);

export default ConfirmChoice;
