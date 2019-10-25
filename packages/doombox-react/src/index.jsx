import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Core
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { App } from './components/App';

// Modules
import {
  RouteProvider,
  AudioProvider,
  IpcListener
} from './modules';

// Utils
import { store } from './store';

// Style
import { theme } from './theme';

// Locale
import './locale';

render(
  <ReduxProvider store={store}>
    <IpcListener>
      <AudioProvider>
        <MuiThemeProvider theme={theme}>
          <RouteProvider>
            <CssBaseline>
              <App />
            </CssBaseline>
          </RouteProvider>
        </MuiThemeProvider>
      </AudioProvider>
    </IpcListener>
  </ReduxProvider>,
  document.getElementById('root')
);
