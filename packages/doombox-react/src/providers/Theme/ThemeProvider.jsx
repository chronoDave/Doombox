import React, {
  useState,
  useMemo
} from 'react';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Utils
import { ThemeContext } from '../../utils/context';

import { createTheme } from './theme';

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [colors, setColors] = useState({});

  const theme = createTheme({ colors: { darkMode, ...colors } });

  const methodValue = useMemo(() => ({
    setDarkMode,
    setColors
  }), [setDarkMode, setColors]);

  return (
    <ThemeContext.Method.Provider value={methodValue}>
      <ThemeContext.DarkMode.Provider value={darkMode}>
        <ThemeContext.Colors.Provider value={colors}>
          <MuiThemeProvider theme={theme}>
            {children}
          </MuiThemeProvider>
        </ThemeContext.Colors.Provider>
      </ThemeContext.DarkMode.Provider>
    </ThemeContext.Method.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default ThemeProvider;
