import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Core
import { CssBaseline } from '@material-ui/core';

import { App } from './modules';

// Providers
import {
  IpcProvider,
  ThemeProvider
} from './providers';

// Redux
import { store } from './redux';

render(
  <ReduxProvider store={store}>
    <IpcProvider>
      <ThemeProvider>
        <CssBaseline>
          <App>
            <p>Hey</p>
          </App>
        </CssBaseline>
      </ThemeProvider>
    </IpcProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
