import React from 'react';
import { render } from 'react-dom';

import classes from './index.styles';

render(
  <div className={classes.root}>
    Doombox
  </div>,
  document.getElementById('root')
);
