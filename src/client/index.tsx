import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { render } from 'react-dom';

// Providers
import ThemeProvider from './providers/Theme.provider';

// Modules
import { Window } from './modules';

import store from './redux';

render(
  <ReduxProvider store={store}>
    <ThemeProvider>
      <Window>
        Doombox
      </Window>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
