import React, { createContext, useContext } from 'react';

import themeJson from '@doombox-config/theme.json';

export interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext(themeJson);

export type Theme = typeof themeJson;

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <ThemeContext.Provider value={themeJson}>
    {children}
  </ThemeContext.Provider>
);
