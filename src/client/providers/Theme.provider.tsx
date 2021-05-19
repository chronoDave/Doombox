import React, { useEffect, createContext, useContext } from 'react';
import { injectGlobal } from '@emotion/css';

import themeJson from '@doombox-config/theme.json';

export interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext(themeJson);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  useEffect(() => {
    injectGlobal({
      body: {
        margin: 0
      }
    });
  }, []);

  return (
    <ThemeContext.Provider value={themeJson}>
      {children}
    </ThemeContext.Provider>
  );
};
