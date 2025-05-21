import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import firebase from '../../firebase';
import { useNavigate } from 'react-router-dom';

// 1. Create context
const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const auth = getAuth(firebase);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  // Listen for auth state changes
  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );
  }, [auth]);

  // login helper
  const login = useCallback(async (email, password, rememberMe) => {
    try {
      setLoginError('');
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);
      return navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setLoginError('Wrong email or password');
      } else if (err.code === 'auth/invalid-email') {
        setLoginError('You need to enter a valid email address');
      } else {
        setLoginError(err.message);
      }
      setError(err);
      throw err;
    }
  }, [auth, navigate]);

  // logout helper
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading, error, loginError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook for consuming
export const useAuth = () => {
  return useContext(AuthContext);
};

// Exporting the AuthContext to be usable by wrappers in tests
export { AuthContext };
