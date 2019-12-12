import React, { Component } from 'react';
import {
  TYPE,
  STORAGE
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Actions
import {
  readStorage,
  updateStorage
} from '../../actions';

// Utils
import { ThemeContext } from '../../utils/context';

import { createTheme } from './theme';
import { DEFAULT_PALETTE } from './palette';

// Electron
const { ipcRenderer } = window.require('electron');

class ThemeProvider extends Component {
  constructor() {
    super();

    const setDarkTheme = darkTheme => updateStorage(
      TYPE.IPC.CONFIG.USER,
      STORAGE.PALETTE,
      { darkTheme }
    );

    this.state = {
      theme: createTheme({ palette: { ...DEFAULT_PALETTE } }),
      methods: {
        setDarkTheme
      }
    };
  }

  componentDidMount() {
    ipcRenderer.on(TYPE.IPC.CONFIG.USER, (event, payload) => {
      this.setState(state => ({
        ...state,
        theme: createTheme({ palette: { ...DEFAULT_PALETTE, ...payload } })
      }));
    });

    readStorage(TYPE.IPC.CONFIG.USER, STORAGE.PALETTE);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;
    const { theme, methods } = this.state;

    return (
      <ThemeContext.Provider value={methods}>
        <MuiThemeProvider theme={theme}>
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default ThemeProvider;
