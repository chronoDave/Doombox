import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import { App } from './modules';

// Providers
import {
  LibraryProvider,
  AudioProvider,
  ThemeProvider,
  Router
} from './providers';

// Listeners
import {
  ThemeListener,
  MediaSessionListener,
  LibraryListener
} from './listener';

render(
  <LibraryProvider>
    <AudioProvider>
      <ThemeProvider>
        <LibraryListener>
          <MediaSessionListener>
            <ThemeListener>
              <CssBaseline>
                <App>
                  <Router />
                </App>
              </CssBaseline>
            </ThemeListener>
          </MediaSessionListener>
        </LibraryListener>
      </ThemeProvider>
    </AudioProvider>
  </LibraryProvider>,
  document.getElementById('root')
);
