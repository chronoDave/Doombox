import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  TYPE,
  STORAGE
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Actions
import { updateStorage } from '../../actions';

// Hooks
import { useIpc } from '../../hooks';

// Utils
import { ThemeContext } from '../../utils/context';
import { HOOK } from '../../utils/const';

import { createTheme } from './theme';
import { DEFAULT_PALETTE } from './palette';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(createTheme({
    palette: { ...DEFAULT_PALETTE }
  }));

  const { darkTheme } = useIpc(HOOK.IPC.CONFIG);

  useEffect(() => {
    setTheme(createTheme({
      palette: {
        ...DEFAULT_PALETTE,
        darkTheme: !!darkTheme
      }
    }));
  }, [darkTheme]);

  const methods = useMemo(() => ({
    setDarkTheme: newDarkTheme => updateStorage(
      TYPE.IPC.CONFIG.USER,
      STORAGE.PALETTE,
      { darkTheme: newDarkTheme }
    )
  }), []);

  return (
    <ThemeContext.Provider value={methods}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default ThemeProvider;
