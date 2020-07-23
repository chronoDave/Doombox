import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Core
import { CssBaseline } from '@material-ui/core';
import { App } from './components';

// Providers
import {
  IpcProvider,
  ThemeProvider,
  AudioProvider
} from './providers';

// Redux
import { store } from './redux';

render(
  <ReduxProvider store={store}>
    <IpcProvider>
      <AudioProvider>
        <ThemeProvider>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </AudioProvider>
    </IpcProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
