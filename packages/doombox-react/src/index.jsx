import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Core
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { App } from './components/App';

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
        <App />
      </CssBaseline>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
