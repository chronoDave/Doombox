import React from 'react';
import { TYPE } from '@doombox/utils';
import clsx from 'clsx';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import {
  ButtonBase,
  Box
} from '@material-ui/core';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useAppStyles } from './App.style';

// Electron
const { remote } = window.require('electron');

const browserWindow = remote.getCurrentWindow();

const AppBar = () => {
  const classes = useAppStyles();

  const handleMaximize = () => (browserWindow.isMaximized() ?
    browserWindow.unmaximize() :
    browserWindow.maximize()
  );

  const { metadata } = useAudio(HOOK.AUDIO.CURRENT);

  return (
    <div className={classes.barRoot}>
      <div className={clsx(classes.barTitle, classes.draggable)}>
        <Typography noWrap>
          {metadata ? `${metadata.artist} - ${metadata.title}` : 'Doombox'}
        </Typography>
      </div>
      <Box display="flex" flexShrink={0}>
        <ButtonBase
          id={TYPE.ID.WINDOW_MINIMIZE}
          onClick={() => browserWindow.minimize()}
          classes={{ root: classes.button }}
        >
          <Icon type="minimize" fontSize="small" />
        </ButtonBase>
        <ButtonBase
          id={TYPE.ID.WINDOW_MAXIMIZE}
          onClick={() => handleMaximize()}
          classes={{ root: classes.button }}
        >
          <IconMaximize fontSize="small" />
        </ButtonBase>
        <ButtonBase
          id={TYPE.ID.WINDOW_CLOSE}
          onClick={() => browserWindow.close()}
          classes={{ root: classes.buttonClose }}
        >
          <IconClose fontSize="small" />
        </ButtonBase>
      </Box>
    </div>
  );
};

export default AppBar;
