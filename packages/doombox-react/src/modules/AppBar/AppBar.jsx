import React from 'react';
import clsx from 'clsx';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import { Box, useTheme } from '@material-ui/core';

import { Icon, ButtonBase } from '../../components';

// Actions
import {
  windowClose,
  windowMaximize,
  windowMinimize
} from '../../actions';

// Assets
import iconDark from '../../../assets/icon_dark.png';
import iconLight from '../../../assets/icon_light.png';

// Styles
import { useAppBarStyles } from './AppBar.styles';

import AppBarMenu from './AppBarMenu.private';
import AppBarTitle from './AppBarTitle.private';

const AppBar = () => {
  const theme = useTheme();
  const classes = useAppBarStyles();

  return (
    <Box display="flex" flexGrow={1} bgcolor="grey.50">
      <div className={clsx(classes.icon, classes.drag)}>
        <img
          src={theme.palette.type === 'dark' ? iconDark : iconLight}
          alt="Doombox icon"
        />
      </div>
      <AppBarMenu />
      <AppBarTitle />
      <Box
        display="flex"
        flexShrink={0}
        justifyContent="flex-end"
      >
        <ButtonBase
          onClick={windowMinimize}
          className={classes.buttonIcon}
        >
          <Icon type="minimize" fontSize="small" />
        </ButtonBase>
        <ButtonBase
          onClick={windowMaximize}
          className={classes.buttonIcon}
        >
          <IconMaximize fontSize="small" />
        </ButtonBase>
        <ButtonBase
          onClick={windowClose}
          className={clsx(classes.buttonIcon, classes.buttonIconClose)}
        >
          <IconClose fontSize="small" />
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default AppBar;
