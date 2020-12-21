import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Typography, Hidden } from '../../components';

import { PlayerControls } from '../PlayerControls';
import { PlayerTime } from '../PlayerTime';

// Hooks
import { useTranslation, useMediaQuery } from '../../hooks';

// Validation
import { propCover } from '../../validation/propTypes';

// Styles
import usePlayerStyles from './Player.styles';

const Player = props => {
  const {
    title,
    titlelocalized,
    artist,
    artistlocalized,
    cover
  } = props;
  const { t, getLocalizedTag } = useTranslation();
  const classes = usePlayerStyles({ cover });
  const isMd = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'sm')
  ));

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography
          clamp={2}
          align="center"
          fontWeight={500}
          variant={isMd ? 'h6' : 'body'}
        >
          {(
            getLocalizedTag({ titlelocalized, title }, 'title') ||
            t('description.playlist_empty', { transform: 'capitalize' })
          )}
        </Typography>
        <Typography clamp align="center">
          {getLocalizedTag({ artistlocalized, artist }, 'artist') || ''}
        </Typography>
      </div>
      <Hidden on={({ create }) => create('maxWidth', 'sm')}>
        <PlayerControls />
      </Hidden>
      <Hidden on={({ create }) => create('maxHeight', 'xs')}>
        <PlayerTime />
      </Hidden>
    </div>
  );
};

Player.defaultProps = {
  title: null,
  titlelocalized: null,
  artist: '',
  artistlocalized: '',
  cover: {
    file: ''
  }
};

Player.propTypes = {
  title: PropTypes.string,
  titlelocalized: PropTypes.string,
  artist: PropTypes.string,
  artistlocalized: PropTypes.string,
  cover: propCover
};

const mapStateToProps = state => ({
  cover: state.player.metadata.covers.map(image => (
    state.entities.images.map[image]
  ))[0],
  artist: state.player.metadata.artist,
  artistlocalized: state.player.metadata.artistlocalized,
  title: state.player.metadata.title,
  titlelocalized: state.player.metadata.titlelocalized
});

export default connect(
  mapStateToProps
)(Player);
