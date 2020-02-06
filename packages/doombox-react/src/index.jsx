import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Core
import { CssBaseline } from '@material-ui/core';

// Providers
import {
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  RouteProvider
} from './providers';

// Redux
import { store } from './redux';

// Locale
import './utils/locale';

render(
  <ReduxProvider store={store}>
    <IpcProvider>
      <AudioProvider>
        <ThemeProvider>
          <CssBaseline>
            <RouteProvider />
          </CssBaseline>
        </ThemeProvider>
      </AudioProvider>
    </IpcProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
