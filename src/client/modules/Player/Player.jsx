import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Typography, Hidden } from '../../components';

import { PlayerControls } from '../PlayerControls';
import { PlayerTime } from '../PlayerTime';

// Hooks
import { useTranslation, useMediaQuery } from '../../hooks';

// Styles
import usePlayerStyles from './Player.styles';

const Player = props => {
  const {
    title,
    titlelocalized,
    artist,
    artistlocalized,
    image
  } = props;
  const { t, getLocalizedTag } = useTranslation();
  const classes = usePlayerStyles({ image });
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
          fontWeight={isMd ? 400 : 500}
          variant={isMd ? 'h6' : 'body'}
          color="inherit"
        >
          {(
            getLocalizedTag({ titlelocalized, title }, 'title') ||
            t('description.playlist_empty', { transform: 'capitalize' })
          )}
        </Typography>
        <Typography clamp align="center" color="inherit">
          {getLocalizedTag({ artistlocalized, artist }, 'artist') || ''}
        </Typography>
      </div>
      <Hidden on={({ create }) => create('maxWidth', 'sm')}>
        <PlayerControls className={classes.buttons} />
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
  image: ''
};

Player.propTypes = {
  title: PropTypes.string,
  titlelocalized: PropTypes.string,
  artist: PropTypes.string,
  artistlocalized: PropTypes.string,
  image: PropTypes.string
};

const mapStateToProps = state => {
  const images = state.player.metadata.images
    .map(id => state.entities.images.map[id]);

  return ({
    image: images[0] ?
      images[0].files.thumbnail :
      null,
    artist: state.player.metadata.artist,
    artistlocalized: state.player.metadata.artistlocalized,
    title: state.player.metadata.title,
    titlelocalized: state.player.metadata.titlelocalized
  });
};

export default connect(
  mapStateToProps
)(Player);
