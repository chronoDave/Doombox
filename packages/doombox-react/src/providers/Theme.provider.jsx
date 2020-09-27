import { ipcRenderer } from 'electron';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';

// Actions
import { ipcFind } from '../actions';

// Utils
import { createTheme } from '../theme';

// Types
import { IPC, THEME } from '../../../doombox-types';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(createTheme(THEME));

  useEffect(() => {
    ipcRenderer.on(IPC.CHANNEL.THEME, (event, payload) => {
      setTheme(createTheme(payload.data));
    });

    ipcFind(IPC.CHANNEL.THEME, null);

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
