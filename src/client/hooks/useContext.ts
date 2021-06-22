import { useContext } from 'react';

import { ThemeContext } from '../providers/Theme.provider';

export const useTheme = () => useContext(ThemeContext);
