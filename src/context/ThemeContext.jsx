import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Dark mode is always on — no user toggle
export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('pz-theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: true, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
