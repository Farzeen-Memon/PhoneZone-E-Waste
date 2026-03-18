import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pz-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Admin credentials
    if (email === 'admin@phonezone.in' && password === 'admin123') {
      const adminUser = { name: 'Alex ReTech', email, role: 'admin', avatar: 'AR' };
      setUser(adminUser);
      localStorage.setItem('pz-user', JSON.stringify(adminUser));
      return { success: true, role: 'admin' };
    }
    // Regular user
    if (email && password.length >= 4) {
      const regularUser = { name: 'Alex Smith', email, role: 'user', avatar: 'AS' };
      setUser(regularUser);
      localStorage.setItem('pz-user', JSON.stringify(regularUser));
      return { success: true, role: 'user' };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pz-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
