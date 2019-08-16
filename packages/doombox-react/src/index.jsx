import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Core
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { App } from './components/App';
import { RouteProvider } from './components/Router';
import { AudioProvider } from './components/Audio';

// Utils
import { store } from './store';

// Const
import { PATHS, VIEWS } from './const';

// Style
import { theme } from './theme';

// Locale
import './locale';

render(
  <ReduxProvider store={store}>
    <AudioProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <RouteProvider
            path={PATHS.INDEX}
            view={VIEWS.ALBUM}
          >
            <App />
          </RouteProvider>
        </CssBaseline>
      </MuiThemeProvider>
    </AudioProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
