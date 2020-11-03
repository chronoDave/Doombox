import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox-utils';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import { Typography, Slider, Hidden } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

import { PlayerControls } from '../PlayerControls';

// Validation
import { propCover } from '../../validation/propTypes';

// Styles
import usePlayerStyles from './Player.style';

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
    <div className={classes.root}>
      <div className={classes.cover}>
        <div className={classes.coverTitle}>
          <Typography clamp={2} align="center">
            {title}
          </Typography>
          <Typography clamp={2} align="center">
            {artist}
          </Typography>
        </div>
        <Hidden smUp>
          <PlayerControls className={classes.controls} />
        </Hidden>
        <Hidden mdDown>
          <div className={classes.duration}>
            <Typography>
              {formatTime(position)}
            </Typography>
            <Typography>
              {`-${formatTime(duration - position)}`}
            </Typography>
          </div>
        </Hidden>
      </div>
      <Slider
        value={position}
        max={duration}
        onDrag={throttledSeek}
      />
      <Hidden smDown>
        <PlayerControls />
      </Hidden>
    </div>
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
