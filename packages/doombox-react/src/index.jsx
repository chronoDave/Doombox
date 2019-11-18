import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import {
  AudioProvider,
  KeybindListener,
  Window
} from './modules';

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
        <Window>
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
        </Window>
      </CssBaseline>
    </KeybindListener>
  </AudioProvider>,
  document.getElementById('root')
);
