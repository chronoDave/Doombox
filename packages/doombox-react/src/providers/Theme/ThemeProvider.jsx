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

  const {
    darkTheme,
    primary,
    secondary,
    error,
    warning,
    success,
    info,
    grey
  } = useIpc(HOOK.IPC.CONFIG);

  useEffect(() => {
    setTheme(createTheme({
      palette: {
        darkTheme: !!darkTheme,
        primary: primary || DEFAULT_PALETTE.primary,
        secondary: secondary || DEFAULT_PALETTE.secondary,
        error: error || DEFAULT_PALETTE.error,
        warning: warning || DEFAULT_PALETTE.warning,
        success: success || DEFAULT_PALETTE.success,
        info: info || DEFAULT_PALETTE.info,
        grey: grey || DEFAULT_PALETTE.grey,
      }
    }));
  }, [
    darkTheme,
    primary,
    secondary,
    error,
    warning,
    success,
    info,
    grey
  ]);

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
