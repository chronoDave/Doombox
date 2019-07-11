import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Core
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { App } from './components/App';
import { Listener } from './components/Listener';

// Utils
import { store } from './store';

// Style
import { theme } from './theme';

// Locale
import './locale';

render(
  <Provider store={store}>
    <Listener>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </MuiThemeProvider>
    </Listener>
  </Provider>,
  document.getElementById('root')
);
