import React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Switch from '../../../components/UI/Switch/Switch';

import './Login.css';

const Login = ({ setPassword, setEmail, handleSwitchClick, handleSubmitButtonClick, errorMsg, filledFields }) => {

  return(
    <Modal show={true}>
      <h1>Login plx</h1>
      <p className='LoginError'>{errorMsg}</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          elementConfig={{ placeholder: 'Username (email)',type: 'email', autoComplete: 'on' }}
          changed={(e) => setEmail(e.target.value)}
          dataTestId='loginUsername'/>
        <Input
          elementConfig={{ placeholder: 'Password',type: 'password', autoComplete: 'on' }}
          changed={(e) => setPassword(e.target.value)}
          dataTestId='loginPassword'/>
        <div className='Remember'>
          Remember me
          <Switch
            orientation='horizontal'
            clicked={handleSwitchClick}
            dataTestId='rememberMe'
            activated={true}/>
        </div>
        <Button
          disabled={!filledFields}
          clicked={handleSubmitButtonClick}
          dataTestId='loginSubmit'>
          Sign in
        </Button>
      </form>
    </Modal>

  );
};

export default Login;
