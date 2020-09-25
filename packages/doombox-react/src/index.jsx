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
  LanguaugeProvider,
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  KeybindProvider
} from './providers';

// Redux
import { store } from './redux';

render(
  <ReduxProvider store={store}>
    <IpcProvider>
      <LanguaugeProvider>
        <AudioProvider>
          <KeybindProvider>
            <ThemeProvider>
              <CssBaseline>
                <App>
                  <Player />
                </App>
              </CssBaseline>
            </ThemeProvider>
          </KeybindProvider>
        </AudioProvider>
      </LanguaugeProvider>
    </IpcProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
