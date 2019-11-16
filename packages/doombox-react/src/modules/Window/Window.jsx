import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Box
} from '@material-ui/core';

// Style
import { windowStyle } from './Window.style';

// Electron
const { remote } = window.require('electron');

const browserWindow = remote.getCurrentWindow();

const Window = ({ classes, children }) => {
  const handleMaximize = () => (browserWindow.isMaximized() ?
    browserWindow.unmaximize() :
    browserWindow.maximize()
  );

  return (
    <Box>
      <Box display="flex">
        <div className={classes.draggable} />
        <Box display="flex">
          <Button
            id="window-minimize"
            onClick={() => browserWindow.minimize()}
          >
            Minimize
          </Button>
          <Button
            id="window-maximize"
            onClick={() => handleMaximize()}
          >
            Maximize
          </Button>
          <Button
            id="window-close"
            onClick={() => browserWindow.close()}
          >
            Close
          </Button>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

Window.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.shape({
    draggable: PropTypes.string
  }).isRequired
};

export default withStyles(windowStyle)(Window);
