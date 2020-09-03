import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import {
  Typography,
  Icon
} from '../../components';

// Actions
import {
  windowClose,
  windowMaximize,
  windowMinimize
} from '../../actions';

// Styles
import { useAppStyles } from './App.styles';

// Assets
import iconDark from '../../../assets/icon_dark.png';
import iconLight from '../../../assets/icon_light.png';

const AppBar = ({ variant }) => {
  const classes = useAppStyles();

  return (
    <div className={classes.barRoot}>
      <div className={classes.barIcon}>
        <img
          src={variant === 'dark' ? iconDark : iconLight}
          alt="Doombox icon"
        />
      </div>
      <div className={clsx(classes.barTitle, classes.drag)}>
        <Typography noWrap variant="body2">
          Doombox
        </Typography>
      </div>
      <Box display="flex" flexShrink={0}>
        <ButtonBase
          onClick={windowMinimize}
          classes={{ root: classes.button }}
        >
          <Icon type="minimize" fontSize="small" />
        </ButtonBase>
        <ButtonBase
          onClick={windowMaximize}
          classes={{ root: classes.button }}
        >
          <IconMaximize fontSize="small" />
        </ButtonBase>
        <ButtonBase
          onClick={windowClose}
          classes={{ root: classes.button }}
          className={classes.buttonClose}
        >
          <IconClose fontSize="small" />
        </ButtonBase>
      </Box>
    </div>
  );
};

const mapStateToProps = state => ({
  variant: state.ipc.theme.variant
});

export default connect(
  mapStateToProps
)(AppBar);
