import { createContext } from 'react';
import { theme as defaultTheme } from '@doombox-theme';

import breakpoints from './breakpoints';

export type Theme = typeof theme;

export const theme = {
  ...defaultTheme,
  breakpoints
};

export const ThemeContext = createContext(theme);
