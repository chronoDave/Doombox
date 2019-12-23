import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Providers
import {
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  RouteProvider
} from './providers';

// Locale
import './utils/locale';

render(
  <IpcProvider>
    <AudioProvider>
      <ThemeProvider>
        <CssBaseline>
          <RouteProvider />
        </CssBaseline>
      </ThemeProvider>
    </AudioProvider>
  </IpcProvider>,
  document.getElementById('root')
);
