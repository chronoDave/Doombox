import { shell } from 'electron';

import React, { Fragment } from 'react';

// Core
import { Divider } from '@material-ui/core';

import { MenuItem } from '../../../components';

const AppMenuHelp = () => (
  <Fragment>
    <MenuItem
      primary="Open GitHub"
      onClick={event => {
        event.preventDefault();
        shell.openExternal('https://github.com/chronoDave/Doombox');
      }}
    />
    <Divider />
    <MenuItem
      primary="Report issue"
      onClick={event => {
        event.preventDefault();
        shell.openExternal('https://github.com/chronoDave/Doombox/issues/new');
      }}
    />
  </Fragment>
);

export default AppMenuHelp;
