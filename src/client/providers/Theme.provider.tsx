import React, { useEffect } from 'react';
import { injectGlobal } from '@emotion/css';

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

  return children;
};
