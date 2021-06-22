import React, { createContext, useEffect } from 'react';
import { injectGlobal } from '@emotion/css';
import theme from '@doombox-theme';

export const ThemeContext = createContext(theme);

export interface ThemeProviderProps {
  children: React.ReactElement
}

export default ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    injectGlobal([
      { variant: 'Light', fontWeight: 300 },
      { variant: 'Regular', fontWeight: 400 },
      { variant: 'Medium', fontWeight: 700 }
    ].map(({ variant, fontWeight }) => ({
      '@font-face': {
        fontFamily: 'NotoSansJP',
        src: `url('../fonts/NotoSansJP-${variant}.otf') format('truetype')`,
        fontWeight
      }
    })));

    injectGlobal({
      body: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0
      }
    });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
