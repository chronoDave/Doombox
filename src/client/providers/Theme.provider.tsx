import React, { useEffect } from 'react';
import { injectGlobal } from '@emotion/css';

import { theme, ThemeContext } from '../theme';

export interface ThemeProviderProps {
  children: React.ReactElement
}

export default ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    injectGlobal({
      body: {
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
