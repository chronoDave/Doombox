import React, { useEffect } from 'react';
import { injectGlobal } from '@emotion/css';

import { theme, ThemeContext } from '../theme';

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
        margin: 0,
        fontFamily: 'NotoSansJP',
        color: 'white'
      }
    });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
