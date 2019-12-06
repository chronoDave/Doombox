import React from 'react';

import {
  IconButtonNext,
  IconButtonPlay,
  IconButtonPrevious,
  IconButtonStop,
  IconButtonMute,
  IconButtonShuffle,
  SliderPlayer,
  SliderVolume
} from '../../components';

import AppBar from './AppBar.private';

const App = () => (
  <AppBar>
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
  </AppBar>
);

export default App;
