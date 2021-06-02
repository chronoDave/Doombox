import { useContext } from 'react';

import { ThemeContext } from '../theme';

export const useTheme = () => useContext(ThemeContext);
