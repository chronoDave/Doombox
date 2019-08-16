import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Core
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { App } from './components/App';
import { RouterProvider } from './components/Router';

// Utils
import { store } from './store';

// Style
import { theme } from './theme';

// Locale
import './locale';

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider initialPath="/">
          <App />
        </RouterProvider>
      </CssBaseline>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
