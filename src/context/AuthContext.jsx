import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Helpers to manage registered users in localStorage
const getUsers = () => JSON.parse(localStorage.getItem('pz-users') || '[]');
const saveUsers = (users) => localStorage.setItem('pz-users', JSON.stringify(users));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pz-user');
    return saved ? JSON.parse(saved) : null;
  });

  const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('pz-user', JSON.stringify(data.user));
        return { success: true, role: data.user.role };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Could not connect to the server' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('pz-user', JSON.stringify(data.user));
        return { success: true, role: data.user.role };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Could not connect to the server' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pz-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user, isAdmin: user?.role === 'admin', isDelivery: user?.role === 'delivery' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
