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

  const login = (email, password) => {
    // Admin hardcoded credentials
    if (email === 'admin@phonezone.in' && password === 'admin123') {
      const adminUser = { name: 'Alex ReTech', email, role: 'admin', avatar: 'AR' };
      setUser(adminUser);
      localStorage.setItem('pz-user', JSON.stringify(adminUser));
      return { success: true, role: 'admin' };
    }

    const users = getUsers();
    const found = users.find(u => u.email === email);

    if (!found) {
      return { success: false, error: 'Account not found. Please create an account first.' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const loggedIn = { name: found.name, email: found.email, role: 'user', avatar: found.name[0].toUpperCase() + (found.name.split(' ')[1]?.[0]?.toUpperCase() || '') };
    setUser(loggedIn);
    localStorage.setItem('pz-user', JSON.stringify(loggedIn));
    return { success: true, role: 'user' };
  };

  const register = (name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = { name, email, password };
    saveUsers([...users, newUser]);
    const loggedIn = { name, email, role: 'user', avatar: name[0].toUpperCase() + (name.split(' ')[1]?.[0]?.toUpperCase() || '') };
    setUser(loggedIn);
    localStorage.setItem('pz-user', JSON.stringify(loggedIn));
    return { success: true, role: 'user' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pz-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
