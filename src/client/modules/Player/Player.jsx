import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox-utils';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import { Typography, Slider, Hidden } from '../../components';

// Hooks
import { useAudio, useTranslation } from '../../hooks';

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
  const { t } = useTranslation();
  const classes = usePlayerStyles({ cover });

  const throttledSeek = throttle((event, newValue) => seek(newValue), 100);

  return (
    <div className={classes.root}>
      <div className={classes.cover}>
        <div className={classes.coverTitle}>
          <Typography clamp={2} align="center">
            {title || t('description.playlist_empty', { transform: 'capitalize' })}
          </Typography>
          <Typography clamp align="center">
            {artist}
          </Typography>
        </div>
        <Hidden on={({ create, values, queries }) => create(queries.maxWidth, values.sm)}>
          <PlayerControls />
        </Hidden>
        <Hidden on={({ create, values, queries }) => create(queries.maxHeight, values.xs)}>
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
      <Hidden on={({ create, values, queries }) => create(queries.minWidth, values.sm)}>
        <PlayerControls />
      </Hidden>
    </div>
  );
};

Player.defaultProps = {
  title: null,
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
  cover: state.player.metadata.covers.map(image => (
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
