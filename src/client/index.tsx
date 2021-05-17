import React from 'react';
import { render } from 'react-dom';

// Providers
import { ThemeProvider } from './providers/Theme.provider';

// Modules
import { App } from './modules/App/App';

render(
  <ThemeProvider>
    <App>
      Doombox
    </App>
  </ThemeProvider>,
  document.getElementById('root')
);
