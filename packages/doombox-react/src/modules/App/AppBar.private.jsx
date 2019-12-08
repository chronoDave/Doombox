import React from 'react';
import PropTypes from 'prop-types';
import { ID } from '@doombox/utils';
import clsx from 'clsx';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  ButtonBase,
  Box
} from '@material-ui/core';

import { Icon } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { AppStyles } from './App.style';

// Electron
const { remote } = window.require('electron');

const browserWindow = remote.getCurrentWindow();

const AppBar = ({ classes }) => {
  const handleMaximize = () => (browserWindow.isMaximized() ?
    browserWindow.unmaximize() :
    browserWindow.maximize()
  );

  const { metadata } = useAudio(HOOK.AUDIO.METADATA);

  return (
    <div className={classes.barRoot}>
      <div className={clsx(classes.barTitle, classes.draggable)}>
        <Typography>
          {metadata ? `${metadata.artist} - ${metadata.title}` : 'Doombox'}
        </Typography>
      </div>
      <Box display="flex">
        <ButtonBase
          id={ID.WINDOW_MINIMIZE}
          onClick={() => browserWindow.minimize()}
          classes={{ root: classes.button }}
        >
          <Icon type="minimize" fontSize="small" />
        </ButtonBase>
        <ButtonBase
          id={ID.WINDOW_MAXIMIZE}
          onClick={() => handleMaximize()}
          classes={{ root: classes.button }}
        >
          <IconMaximize fontSize="small" />
        </ButtonBase>
        <ButtonBase
          id={ID.WINDOW_CLOSE}
          onClick={() => browserWindow.close()}
          classes={{ root: classes.buttonClose }}
        >
          <IconClose fontSize="small" />
        </ButtonBase>
      </Box>
    </div>
  );
};

AppBar.propTypes = {
  classes: PropTypes.shape({
    barTitle: PropTypes.string,
    barRoot: PropTypes.string,
    button: PropTypes.string,
    buttonClose: PropTypes.string,
    draggable: PropTypes.string
  }).isRequired
};

export default withStyles(AppStyles)(AppBar);
