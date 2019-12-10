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
  Router
} from './providers';

// Listeners
import { MediaSessionListener } from './listeners';

// Locale
import './utils/locale';

render(
  <IpcProvider>
    <AudioProvider>
      <ThemeProvider>
        <MediaSessionListener>
          <CssBaseline>
            <App>
              <Router />
            </App>
          </CssBaseline>
        </MediaSessionListener>
      </ThemeProvider>
    </AudioProvider>
  </IpcProvider>,
  document.getElementById('root')
);
