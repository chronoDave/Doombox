import React from 'react';
import clsx from 'clsx';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import { Box } from '@material-ui/core';

import { Icon, ButtonBase } from '../../../components';

// Actions
import {
  windowClose,
  windowMaximize,
  windowMinimize
} from '../../../actions';

// Styles
import { useAppStyles } from '../App.styles';

const AppControls = () => {
  const classes = useAppStyles();

  return (
    <Box
      display="flex"
      flexShrink={0}
      flexGrow={1}
      justifyContent="flex-end"
    >
      <ButtonBase
        onClick={windowMinimize}
        className={classes.barButtonIcon}
      >
        <Icon type="minimize" fontSize="small" />
      </ButtonBase>
      <ButtonBase
        onClick={windowMaximize}
        className={classes.barButtonIcon}
      >
        <IconMaximize fontSize="small" />
      </ButtonBase>
      <ButtonBase
        onClick={windowClose}
        className={clsx(classes.barButtonIcon, classes.barButtonClose)}
      >
        <IconClose fontSize="small" />
      </ButtonBase>
    </Box>
  );
};

export default AppControls;
