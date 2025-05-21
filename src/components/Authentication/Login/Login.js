import React, { useState } from 'react';
import { useAuth } from '../../../hoc/Context/AuthContext';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Switch from '../../UI/Switch/Switch';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const { login, loginError } = useAuth(); // <-- context values

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, rememberMe);
  };

  return (
    <Modal show={true} title='Login plx'>
      {loginError && <p className='LoginError'>{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          label='Username'
          elementConfig={{ placeholder: 'Username (email)', type: 'email', autoComplete: 'on' }}
          changed={(e) => setEmail(e.target.value)}
        />
        <Input
          label='Password'
          elementConfig={{ placeholder: 'Password', type: 'password', autoComplete: 'on' }}
          changed={(e) => setPassword(e.target.value)}
        />
        <div className='Remember'>
          Remember me
          <Switch
            orientation='horizontal'
            clicked={() => setRememberMe(!rememberMe)}
            label='Remember me'
            activated={rememberMe}
          />
        </div>
        <Button
          disabled={!email || !password}
          clicked={handleSubmit}
        >
          Sign in
        </Button>
      </form>
    </Modal>
  );
};

export default Login;
