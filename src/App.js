import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Authentication/Login/Login';
import InstrumentList from './containers/InstrumentList/InstrumentList';
import InstrumentDetails from './containers/InstrumentDetails/InstrumentDetails';
import Settings from './containers/Settings/Settings';
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/Modal/Modal';
import ConfirmChoice from './components/Navigation/ConfirmChoice/ConfirmChoice';
import { app } from './firebase';
import './App.css';

const auth = getAuth(app);

const App = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (error) console.error(error);
    if (!user) navigate('/login');
  }, [user, loading, error, navigate]);

  const handleRememberMeSwitchClick = () => setRememberMe(!rememberMe);

  const login = async () => {
    rememberMe
      ? await setPersistence(auth, browserLocalPersistence)
      : await setPersistence(auth, browserSessionPersistence);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      setLoginError('');
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') setLoginError('Wrong email or password');
      else if (err.code === 'auth/invalid-email') setLoginError('You need to enter a valid email address');
      else setLoginError(err.code);
    }
  };

  const logout = async () => {
    if (user) {
      try {
        await signOut(auth);
      } catch(err) { console.error(err); }
      setLoggingOut(false);
    }
  };

  const appContent = loading
    ? <Spinner />
    : <Routes>
      <Route path='/login' element={
        <Login
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmitButtonClick={login}
          handleSwitchClick={handleRememberMeSwitchClick}
          errorMsg={loginError}
          formValid={email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) && password !== ''}/>}/>
      <Route path='/gearitem' element={<InstrumentDetails userId={user?.uid}/>}/>
      <Route path='/settings' element={<Settings/>} />
      <Route path='/' element={<InstrumentList userId={user?.uid}/>}/>
    </Routes>;

  return (
    <div className="App">
      <Layout
        logout={() => setLoggingOut(true)}>
        <Modal show={loggingOut} modalClosed={() => setLoggingOut(false)}>
          <ConfirmChoice title={'Logging out...'} confirm={logout} reject={() => setLoggingOut(false)}/>
        </Modal>
        {appContent}
      </Layout>
    </div>
  );
};

export default App;
