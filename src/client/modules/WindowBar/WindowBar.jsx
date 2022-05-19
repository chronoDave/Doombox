import React from 'react';

// Core
import { Hidden } from '../../components';

import WindowButtons from './components/WindowButtons/WindowButtons';
import WindowNavigation from './components/WindowNavigation/WindowNavigation';
import WindowTitle from './components/WindowTitle/WindowTitle';
import WindowIcon from './components/WindowIcon/WindowIcon';

// Styles
import useWindowBarStyles from './WindowBar.styles';

const WindowBar = () => {
  const classes = useWindowBarStyles();

  return (
    <Hidden platform="darwin">
      <div className={classes.root}>
        <WindowIcon />
        <WindowNavigation />
        <WindowTitle />
        <WindowButtons />
      </div>
    </Hidden>
  );
};

export default WindowBar;
