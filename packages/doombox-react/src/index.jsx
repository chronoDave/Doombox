import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import { App } from './modules';

// Providers
import {
  IpcProvider,
  AudioProvider
} from './providers';

// Listeners
import { MediaSessionListener } from './listener';

render(
  <IpcProvider>
    <AudioProvider>
      <MediaSessionListener>
        <CssBaseline>
          <App />
        </CssBaseline>
      </MediaSessionListener>
    </AudioProvider>
  </IpcProvider>,
  document.getElementById('root')
);
