import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Authentication/Login/Login';
import InstrumentList from './containers/InstrumentList/InstrumentList';
import InstrumentDetails from './containers/InstrumentDetails/InstrumentDetails';
import Settings from './containers/Settings/Settings';
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/Modal/Modal';
import ConfirmChoice from './components/Navigation/ConfirmChoice/ConfirmChoice';
import { SettingsProvider } from './hoc/Context/SettingsContext';
import { useAuth } from './hoc/Context/AuthContext';
import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute';
import './App.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <InstrumentList userId={user?.uid} />
          </ProtectedRoute>
        }
      />
      <Route
        path='/gearitem'
        element={
          <ProtectedRoute>
            <InstrumentDetails userId={user?.uid} />
          </ProtectedRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* Catch-all redirect */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

const App = () => {
  const [loggingOut, setLoggingOut] = React.useState(false);
  const { logout } = useAuth();

  return (
    <div className='App'>
      <SettingsProvider>
        <Layout logout={() => setLoggingOut(true)}>
          <Modal
            show={loggingOut}
            modalClosed={() => setLoggingOut(false)}
            title='Logging out...'
          >
            <ConfirmChoice confirm={async () => { await logout(); setLoggingOut(false); }} reject={() => setLoggingOut(false)} />
          </Modal>
          <AppContent />
        </Layout>
      </SettingsProvider>
    </div>
  );
};

export default App;
