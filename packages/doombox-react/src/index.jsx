import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Lib
import {
  Audio,
  Keybind
} from './lib';

// Providers
import {
  IpcProvider,
  AudioProvider,
  ThemeProvider,
  RouteProvider
} from './providers';

// Locale
import './utils/locale';

const audio = new Audio();
const keybind = new Keybind();

render(
  <IpcProvider>
    <AudioProvider audio={audio} keybind={keybind}>
      <ThemeProvider>
        <CssBaseline>
          <RouteProvider />
        </CssBaseline>
      </ThemeProvider>
    </AudioProvider>
  </IpcProvider>,
  document.getElementById('root')
);
