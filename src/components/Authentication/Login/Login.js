import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Switch from '../../UI/Switch/Switch';

import './Login.css';

const Login = ({ setPassword, setEmail, handleSwitchClick, handleSubmitButtonClick, errorMsg, formValid }) => {

  return(
    <Modal show={true} title='Login plx'>
      <p className='LoginError'>{errorMsg}</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          label='Username'
          elementConfig={{ placeholder: 'Username (email)',type: 'email', autoComplete: 'on' }}
          changed={(e) => setEmail(e.target.value)}/>
        <Input
          label='Password'
          elementConfig={{ placeholder: 'Password',type: 'password', autoComplete: 'on' }}
          changed={(e) => setPassword(e.target.value)}/>
        <div className='Remember'>
          Remember me
          <Switch
            orientation='horizontal'
            clicked={handleSwitchClick}
            label='Remember me'
            activated={true}/>
        </div>
        <Button
          disabled={!formValid}
          clicked={handleSubmitButtonClick}>
          Sign in
        </Button>
      </form>
    </Modal>

  );
};

export default Login;
