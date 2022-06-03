import React from 'react';

import { cx } from '../../utils';

import WindowButtons from './components/WindowButtons/WindowButtons';
import WindowNavigation from './components/WindowNavigation/WindowNavigation';
import WindowTitle from './components/WindowTitle/WindowTitle';
import WindowIcon from './components/WindowIcon/WindowIcon';
import './WindowBar.scss';

const WindowBar = () => (
  <div className={cx('WindowBar', process.platform === 'darwin' && 'hidden')}>
    <WindowIcon />
    <WindowNavigation />
    <WindowTitle />
    <WindowButtons />
  </div>
);

export default WindowBar;
