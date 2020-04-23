import React from 'react';
import { TYPE } from '@doombox/utils';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import { normalizeArtist } from '../../utils';
import { HOOK } from '../../utils/const';

// Style
import { useAppStyles } from './App.style';

// Electron
const { remote } = window.require('electron');

const browserWindow = remote.getCurrentWindow();

const AppBar = ({ localized }) => {
  const classes = useAppStyles();
  const { metadata } = useAudio(HOOK.AUDIO.CURRENT);

  const handleMaximize = () => (browserWindow.isMaximized() ?
    browserWindow.unmaximize() :
    browserWindow.maximize()
  );

  const getTitle = () => {
    if (metadata) {
      const normalizedArtist = normalizeArtist({
        localized,
        artist: metadata.artist,
        artists: metadata.artists,
        artistlocalized: metadata.artistlocalized,
        artistslocalized: metadata.artistslocalized
      });
      const normalizedTitle = localized ?
        (metadata.titlelocalized || metadata.title) :
        metadata.title;

      return `${normalizedArtist} - ${normalizedTitle}`;
    }
    return 'Doombox';
  };

  return (
    <div className={classes.barRoot}>
      <div className={clsx(classes.barTitle, classes.draggable)}>
        <Typography noWrap>
          {getTitle()}
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

AppBar.propTypes = {
  localized: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  localized: state.config[TYPE.CONFIG.GENERAL].localized
});

export default connect(
  mapStateToProps
)(AppBar);
