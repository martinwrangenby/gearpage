import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { getDatabase, ref, onValue, off, update } from 'firebase/database';
import firebase from '../../firebase';
import { useAuth } from './AuthContext';

const DEFAULT_SETTINGS = {
  showPrice: true,
  showSoldItems: true,
};

const SettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  updateSettings: async () => {},
  loading: true,
});

export const SettingsProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const db = getDatabase(firebase);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setSettings(DEFAULT_SETTINGS);
      setLoading(false);
      return;
    }

    setLoading(true);

    const settingsRef = ref(db, `users/${user.uid}/settings`);
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      const remoteSettings = snapshot.val() || {};

      setSettings({
        ...DEFAULT_SETTINGS,
        ...remoteSettings,
      });

      setLoading(false);
    });

    return () => {
      off(settingsRef);
      unsubscribe();
    };
  }, [db, user, authLoading]);

  const updateSettings = useCallback(
    async (updates) => {
      // Optimistically update local state first so the UI feels instant.
      setSettings((prev) => ({
        ...prev,
        ...updates,
      }));

      if (!user) {
        return;
      }

      const settingsRef = ref(db, `users/${user.uid}/settings`);
      await update(settingsRef, updates);
    },
    [db, user]
  );

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
      loading: authLoading || loading,
    }),
    [settings, updateSettings, authLoading, loading]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};
