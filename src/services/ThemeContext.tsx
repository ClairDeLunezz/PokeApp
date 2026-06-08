import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Colors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  tabBar: string;
}

interface ThemeContextData {
  isDark: boolean;
  toggleTheme: () => void;
  colors: Colors;
}

const light: Colors = {
  background: '#F8F8F8',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  primary: '#DC2626',
  tabBar: '#FFFFFF',
};

const dark: Colors = {
  background: '#111111',
  surface: '#1E1E1E',
  card: '#2A2A2A',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#374151',
  primary: '#EF4444',
  tabBar: '#1A1A1A',
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((v) => !v);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors: isDark ? dark : light }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
