import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { App } from './modules';

// Providers
import {
  LanguaugeProvider,
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  KeybindProvider
} from './providers';

// Redux
import { store } from './redux';

render(
  <ReduxProvider store={store}>
    <IpcProvider>
      <LanguaugeProvider>
        <AudioProvider>
          <KeybindProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </KeybindProvider>
        </AudioProvider>
      </LanguaugeProvider>
    </IpcProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
