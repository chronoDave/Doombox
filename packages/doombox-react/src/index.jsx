import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import { App } from './modules';

// Providers
import {
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  RouteProvider
} from './providers';

// Listeners
import {
  MediaSessionListener,
  Router
} from './listeners';

// Locale
import './utils/locale';

render(
  <IpcProvider>
    <AudioProvider>
      <ThemeProvider>
        <RouteProvider>
          <MediaSessionListener>
            <CssBaseline>
              <App>
                <Router />
              </App>
            </CssBaseline>
          </MediaSessionListener>
        </RouteProvider>
      </ThemeProvider>
    </AudioProvider>
  </IpcProvider>,
  document.getElementById('root')
);
