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
import usePlayerStyles from './Player.styles';

const Player = props => {
  const {
    metadata,
    cover,
    duration,
    position
  } = props;
  const { seek } = useAudio();
  const { t, getLocalizedTag } = useTranslation();
  const classes = usePlayerStyles({ cover });

  const throttledSeek = throttle((event, newValue) => seek(newValue), 100);

  return (
    <div className={classes.root}>
      <div className={classes.cover}>
        <div className={classes.coverTitle}>
          <Typography clamp={2} align="center">
            {
              getLocalizedTag(metadata, 'title') ||
              t('description.playlist_empty', { transform: 'capitalize' })
            }
          </Typography>
          <Typography clamp align="center">
            {getLocalizedTag(metadata, 'artist')}
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
  metadata: {
    title: null,
    titlelocalized: null,
    artist: '',
    artistlocalized: '',
  },
  cover: {
    file: ''
  }
};

Player.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
    titlelocalized: PropTypes.string,
    artist: PropTypes.string,
    artistlocalized: PropTypes.string,
  }),
  cover: propCover,
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  cover: state.player.metadata.covers.map(image => (
    state.entities.images.map[image]
  ))[0],
  metadata: {
    artist: state.player.metadata.artist,
    artistlocalized: state.player.metadata.artistlocalized,
    title: state.player.metadata.title,
    titlelocalized: state.player.metadata.titlelocalized,
  },
  position: state.player.position,
  duration: state.player.duration
});

export default connect(
  mapStateToProps
)(Player);
