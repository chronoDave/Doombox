import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import { App } from './modules';

// Providers
import {
  AudioProvider,
  ThemeProvider,
  Router
} from './providers';

// Listeners
import {
  ThemeListener,
  MediaSessionListener
} from './listener';

render(
  <AudioProvider>
    <ThemeProvider>
      <MediaSessionListener>
        <ThemeListener>
          <CssBaseline>
            <App>
              <Router />
            </App>
          </CssBaseline>
        </ThemeListener>
      </MediaSessionListener>
    </ThemeProvider>
  </AudioProvider>,
  document.getElementById('root')
);
