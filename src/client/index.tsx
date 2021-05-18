import React from 'react';
import { render } from 'react-dom';

// Providers
import { ThemeProvider } from './providers/Theme.provider';

// Modules
import { Window, App } from './modules';

render(
  <ThemeProvider>
    <Window>
      <App>
        Doombox
      </App>
    </Window>
  </ThemeProvider>,
  document.getElementById('root')
);
