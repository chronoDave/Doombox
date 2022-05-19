import React from 'react';

// Core
import { Hidden } from '../../components';

import WindowButtons from './components/WindowButtons/WindowButtons';
import WindowNavigation from './components/WindowNavigation/WindowNavigation';
import WindowTitle from './components/WindowTitle/WindowTitle';
import WindowIcon from './components/WindowIcon/WindowIcon';

import './WindowBar.scss';

const WindowBar = () => (
  <Hidden platform="darwin">
    <div className="WindowBar">
      <WindowIcon />
      <WindowNavigation />
      <WindowTitle />
      <WindowButtons />
    </div>
  </Hidden>
);

export default WindowBar;
