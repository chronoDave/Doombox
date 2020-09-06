import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';

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

// Assets
import iconDark from '../../../assets/icon_dark.png';
import iconLight from '../../../assets/icon_light.png';

// Styles
import { useAppStyles } from './App.styles';

const AppBar = props => {
  const {
    variant,
    title,
    artist,
    album
  } = props;
  const classes = useAppStyles();

  const getText = () => {
    if (title || artist || album) {
      return `${artist || 'Unknown'} - ${title || 'Unknown'} (${album || 'Unknown'})`;
    }
    return 'Doombox';
  };

  return (
    <div className={classes.barRoot}>
      <div className={clsx(classes.barIcon, classes.drag)}>
        <img
          src={variant === 'dark' ? iconDark : iconLight}
          alt="Doombox icon"
        />
      </div>
      <div className={clsx(classes.barTitle, classes.drag)}>
        <Typography noWrap variant="body2">
          {getText()}
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
  variant: PropTypes.string.isRequired,
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string
};

AppBar.defaultProps = {
  title: '',
  artist: '',
  album: ''
};

const mapStateToProps = state => ({
  variant: state.ipc.theme.variant,
  title: state.audio.metadata.title,
  artist: state.audio.metadata.artist,
  album: state.audio.metadata.album
});

export default connect(
  mapStateToProps
)(AppBar);
