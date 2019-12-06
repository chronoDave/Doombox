import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import { WindowBar } from './modules';
import { AudioProvider } from './providers';
import { KeybindListener } from './listeners';

// Components
import {
  IconButtonNext,
  IconButtonPlay,
  IconButtonPrevious,
  IconButtonStop,
  IconButtonMute,
  IconButtonShuffle,
  SliderPlayer,
  SliderVolume
} from './components';

render(
  <AudioProvider>
    <KeybindListener>
      <CssBaseline>
        <WindowBar>
          <div>
            <IconButtonNext />
            <IconButtonPlay />
            <IconButtonPrevious />
            <IconButtonStop />
            <IconButtonMute />
            <SliderPlayer />
            <SliderVolume />
            <IconButtonShuffle />
          </div>
        </WindowBar>
      </CssBaseline>
    </KeybindListener>
  </AudioProvider>,
  document.getElementById('root')
);
