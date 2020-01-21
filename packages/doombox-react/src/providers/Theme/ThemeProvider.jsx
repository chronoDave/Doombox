import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { TYPE } from '@doombox/utils';
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
  const [theme, setTheme] = useState(createTheme(DEFAULT_PALETTE));

  const config = useIpc(HOOK.IPC.CONFIG);
  const configPalette = config[TYPE.CONFIG.PALETTE];

  useEffect(() => {
    setTheme(createTheme({
      ...DEFAULT_PALETTE,
      ...configPalette,
      grey: {
        dark: (configPalette.grey && configPalette.grey.dark) ?
          configPalette.grey.dark :
          DEFAULT_PALETTE.grey.dark,
        light: (configPalette.grey && configPalette.grey.light) ?
          configPalette.grey.light :
          DEFAULT_PALETTE.grey.light
      }
    }));
  }, [configPalette]);

  const methods = useMemo(() => ({
    setDarkTheme: newDarkTheme => updateStorage(
      TYPE.IPC.CONFIG.USER,
      TYPE.CONFIG.PALETTE,
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
