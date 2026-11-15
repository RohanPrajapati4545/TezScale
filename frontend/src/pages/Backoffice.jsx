import React, { useState, useEffect } from 'react';
import BackofficeLogin from './BackofficeLogin';
import Admin from './Admin';

const Backoffice = () => {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));

  useEffect(() => {
    // Keep in sync if localStorage changes across tabs or components
    const handleStorageChange = () => {
      setToken(localStorage.getItem('adminToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = () => {
    const activeToken = localStorage.getItem('adminToken') || 'session_admin_active';
    setToken(activeToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
  };

  // If not authenticated, render login form right at /backoffice
  if (!token) {
    return <BackofficeLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, render Admin Dashboard right at /backoffice
  return <Admin onLogout={handleLogout} />;
};

export default Backoffice;

