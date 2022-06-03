import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { App } from './modules';
import {
  LanguaugeProvider,
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  KeybindProvider
} from './providers';
import { store } from './redux';
import './scss/themes/theme.light.scss';
import './scss/themes/theme.dark.scss';
import './scss/core.scss';

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
