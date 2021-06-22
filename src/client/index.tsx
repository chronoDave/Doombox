import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { render } from 'react-dom';

// Providers
import ThemeProvider from './providers/Theme.provider';

// Modules
import { App } from './modules';

import store from './redux';

render(
  <ReduxProvider store={store}>
    <ThemeProvider>
      <App>
        Doombox
      </App>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
