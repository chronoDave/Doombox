import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Core
import { CssBaseline } from '@material-ui/core';

import {
  App,
  Player
} from './modules';

// Providers
import {
  IpcProvider,
  AudioProvider,
  ThemeProvider
} from './providers';

// Redux
import { store } from './redux';

render(
  <ReduxProvider store={store}>
    <IpcProvider>
      <AudioProvider>
        <ThemeProvider>
          <CssBaseline>
            <App>
              <Player />
            </App>
          </CssBaseline>
        </ThemeProvider>
      </AudioProvider>
    </IpcProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
