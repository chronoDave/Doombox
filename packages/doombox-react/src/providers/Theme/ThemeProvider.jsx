import React, { Component } from 'react';
import {
  TYPE,
  ACTION
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Utils
import { ThemeContext } from '../../utils/context';

import { createTheme } from './theme';
import { DEFAULT_PALETTE } from './palette';

// Electron
const { ipcRenderer } = window.require('electron');

class ThemeProvider extends Component {
  constructor() {
    super();

    const setDarkTheme = darkTheme => {
      this.setState(state => ({
        ...state,
        theme: createTheme({ palette: { ...DEFAULT_PALETTE, darkTheme } })
      }));
      ipcRenderer.send(TYPE.IPC.CONFIG, {
        action: ACTION.CRUD.UPDATE,
        data: { key: 'palette', payload: { darkTheme } }
      });
    };

    this.state = {
      theme: createTheme({ palette: { ...DEFAULT_PALETTE } }),
      methods: {
        setDarkTheme
      }
    };
  }

  componentDidMount() {
    ipcRenderer.once(TYPE.IPC.CONFIG, (event, payload) => {
      this.setState(state => ({
        ...state,
        theme: createTheme({ palette: { ...DEFAULT_PALETTE, ...payload } })
      }));
    });

    ipcRenderer.send(TYPE.IPC.CONFIG, {
      action: ACTION.CRUD.READ,
      data: { key: 'palette' }
    });
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
