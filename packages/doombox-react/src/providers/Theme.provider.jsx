import { ipcRenderer } from 'electron';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IPC, THEME } from '@doombox/utils';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';

// Utils
import { createTheme } from '../theme';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(createTheme(THEME));

  useEffect(() => {
    ipcRenderer.on(IPC.CHANNEL.THEME, (event, payload) => {
      setTheme(createTheme(payload.data));
    });

    return () => {
      ipcRenderer.removeListener(IPC.CHANNEL.THEME);
    };
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeProvider;
