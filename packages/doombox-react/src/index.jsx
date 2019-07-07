import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Core
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { App } from './components/App';
import { IpcListener } from './components/IpcListener';

// Utils
import { store } from './store';

// Style
import { theme } from './theme';

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        {/* <IpcListener /> */}
        <App />
      </CssBaseline>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
