import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import {
  useTheme,
  Box,
  ButtonBase
} from '@material-ui/core';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

// Actions
import {
  setWindowTitle,
  windowClose,
  windowMaximize,
  windowMinimize
} from '../../actions';

// Styles
import { useAppStyles } from './App.styles';

// Validation
import { propMetadata } from '../../validation/propTypes';

// Assets
import iconDark from '../../assets/icon_dark.png';
import iconLight from '../../assets/icon_light.png';

const AppBar = ({ metadata }) => {
  const [title, setTitle] = useState('Doombox');

  const theme = useTheme();
  const classes = useAppStyles();

  useEffect(() => {
    if (metadata) {
      const newTitle = [
        metadata.artist,
        metadata.title,
        'Doombox'
      ].join(' - ');
      setTitle(newTitle);
      setWindowTitle(newTitle);
    }
  }, [metadata]);

  return (
    <div className={classes.barRoot}>
      <div className={classes.barIcon}>
        <img
          src={theme.palette.type === 'dark' ? iconDark : iconLight}
          alt="Doombox icon"
        />
      </div>
      <div className={clsx(classes.barTitle, classes.drag)}>
        <Typography noWrap variant="body2">
          {title}
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

AppBar.propTypes = {
  metadata: propMetadata
};

AppBar.defaultProps = {
  metadata: null
};

const mapStateToProps = state => ({
  metadata: state.audio.song.metadata
});

export default connect(
  mapStateToProps
)(AppBar);
