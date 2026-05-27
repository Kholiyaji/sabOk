'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Toast from '@/components/Toast';

const AppContext = createContext();

const DEFAULT_CONTACTS = [
  { id: 1, name: 'Mom', phone: '+919876543210', status: 'safe', lastSeen: '2 min ago' },
  { id: 2, name: 'Brother', phone: '+919876543211', status: 'away', lastSeen: '1 hour ago' },
];

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [onboarded, setOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState('safe');
  const [lastPing, setLastPing] = useState(null);
  const [dndStart, setDndStart] = useState('22:00');
  const [dndEnd, setDndEnd] = useState('07:00');

  const [toasts, setToasts] = useState([]);

  // 🔥 Load state
  useEffect(() => {
    const saved = localStorage.getItem('subok-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLanguage(parsed.language || 'en');
        setContacts(parsed.contacts || DEFAULT_CONTACTS);
        setOnboarded(parsed.onboarded || false);
        setIsAuthenticated(parsed.isAuthenticated || false);
        setUser(parsed.user || null);
        setLastPing(parsed.lastPing || null);
        setDndStart(parsed.dndStart || '22:00');
        setDndEnd(parsed.dndEnd || '07:00');
      } catch {}
    }
  }, []);

  // 🔥 Save state
  useEffect(() => {
    localStorage.setItem('subok-state', JSON.stringify({
      language,
      contacts,
      onboarded,
      isAuthenticated,
      user,
      lastPing,
      dndStart,
      dndEnd
    }));
  }, [language, contacts, onboarded, isAuthenticated, user, lastPing, dndStart, dndEnd]);

  // 🔔 Toasts
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 🔥 REAL LOGIN (called from frontend)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    showToast('Signed in successfully!', 'success');
  };

  // 🔥 REAL REGISTER (just store locally after API success)
  const register = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    showToast('Account created successfully!', 'success');
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem('subok-state');
    setUser(null);
    setIsAuthenticated(false);
    setOnboarded(false);
    setContacts(DEFAULT_CONTACTS);
    setLanguage('en');
  };

  // 🔥 PING
  const ping = (silent = false) => {
    const now = new Date();
    setLastPing(now.toISOString());
    setUserStatus('safe');
    if (!silent) showToast('Safety ping sent successfully!', 'success');
  };

  const addContact = (contact) => {
    setContacts(prev => [...prev, { ...contact, id: Date.now(), status: 'offline', lastSeen: 'Just added' }]);
    showToast('Contact added successfully!', 'success');
  };

  const removeContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    showToast('Contact removed.', 'info');
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      contacts, setContacts, addContact, removeContact,
      onboarded, setOnboarded,
      isAuthenticated, setIsAuthenticated,
      user, setUser,
      login, register, logout,
      userStatus, setUserStatus,
      lastPing, ping,
      dndStart, setDndStart,
      dndEnd, setDndEnd,
      showToast,
    }}>
      {children}

      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);