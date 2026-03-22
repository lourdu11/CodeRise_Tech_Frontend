import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light'; // 'dark', 'light', 'default' (system)
  });

  const [activeTheme, setActiveTheme] = useState('light'); // Actual applied theme

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let currentTheme = theme;
      if (theme === 'default') {
        currentTheme = mediaQuery.matches ? 'dark' : 'light';
      }

      setActiveTheme(currentTheme);
      root.classList.remove('dark', 'light');
      root.classList.add(currentTheme);
      root.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', theme);
    };

    applyTheme();

    const listener = () => {
      if (theme === 'default') applyTheme();
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  // Handle system theme changes specifically when in 'default' mode
  useEffect(() => {
    if (theme !== 'default') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      setActiveTheme(systemTheme);
      const root = window.document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
