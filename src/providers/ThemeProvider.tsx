import React, { createContext, useContext, ReactNode } from 'react';
import { theme, Theme } from '@/src/theme';

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};