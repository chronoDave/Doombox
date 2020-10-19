import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox-utils';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import { Slider, Box, Hidden } from '@material-ui/core';

import { Typography } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

import { PlayerControls } from '../PlayerControls';

// Validation
import { propCover } from '../../validation/propTypes';

// Styles
import { usePlayerStyles } from './Player.style';

const Player = props => {
  const {
    title,
    artist,
    cover,
    duration,
    position
  } = props;
  const { seek } = useAudio();
  const classes = usePlayerStyles({ cover });

  const throttledSeek = throttle((event, newValue) => seek(newValue), 100);

  return (
    <Box display="flex" flexDirection="column">
      <div className={classes.metadataImage}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Typography clamp={2} align="center">
            {title}
          </Typography>
          <Typography variant="body2" clamp={2} align="center">
            {artist}
          </Typography>
        </Box>
        <Hidden mdUp>
          <PlayerControls />
        </Hidden>
        <Hidden smDown>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">
              {formatTime(position)}
            </Typography>
            <Typography variant="body2">
              {`-${formatTime(duration - position)}`}
            </Typography>
          </Box>
        </Hidden>
      </div>
      <Slider
        value={position}
        max={duration}
        onChange={throttledSeek}
        classes={{
          root: classes.progressRoot,
          rail: classes.progressRail,
          track: classes.progressTrack,
          thumb: classes.progressThumb
        }}
      />
      <Hidden smDown>
        <Box p={1}>
          <PlayerControls />
        </Box>
      </Hidden>
    </Box>
  );
};

Player.defaultProps = {
  title: 'No song selected',
  artist: '',
  cover: {
    file: ''
  }
};

Player.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  cover: propCover,
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  cover: state.player.metadata.cover.map(image => (
    state.entities.images.map[image]
  ))[0],
  title: state.player.metadata.title,
  artist: state.player.metadata.artist,
  position: state.player.position,
  duration: state.player.duration
});

export default connect(
  mapStateToProps
)(Player);
