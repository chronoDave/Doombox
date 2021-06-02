import { createContext } from 'react';

import breakpoints from './breakpoints';

export type Theme = typeof theme;

export const theme = {
  breakpoints
};

export const ThemeContext = createContext(theme);
