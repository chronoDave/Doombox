import url from 'url';

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { STATUS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { Typography, Hidden } from '../../components';

// Hooks
import {
  useTranslation,
  useMediaQuery,
  useTheme,
  useTimer
} from '../../hooks';

// Assets
import backgroundDefault from '../../assets/images/backgroundDefault.png';

// Validation
import { propImage } from '../../validation/propTypes';

// Styles
import usePlayerStyles from './Player.styles';

import PlayerControls from './components/PlayerControls/PlayerControls';
import PlayerTime from './components/PlayerTime/PlayerTime';
import PlayerSlider from './components/PlayerSlider/PlayerSlider';

const Player = props => {
  const {
    title,
    titlelocalized,
    artist,
    artistlocalized,
    image,
    position,
    sliding,
    status
  } = props;
  const theme = useTheme();
  const [current, { create, update, destroy }] = useTimer();
  const { t, getLocalizedTag } = useTranslation();
  const classes = usePlayerStyles();
  const isMd = useMediaQuery(breakpoints => breakpoints.join(
    breakpoints.create('minWidth', 'sm'),
    breakpoints.create('minHeight', 'sm')
  ));

  useEffect(() => {
    if (!sliding && status === STATUS.AUDIO.PLAYING) {
      create();
    } else {
      destroy();
    }
  }, [sliding, status, create, destroy]);

  useEffect(() => {
    if (status === STATUS.AUDIO.STOPPED) {
      destroy();
    }
  }, [status, destroy]);

  useEffect(() => {
    update(position);
  }, [update, position]);

  return (
    <Fragment>
      <div
        className={classes.root}
        style={{
          backgroundImage: theme.createImage((image ?
            url.pathToFileURL(image.files.thumbnail).href :
            backgroundDefault
          ))
        }}
      >
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
        <Hidden on={breakpoints => breakpoints.create('maxWidth', 'sm')}>
          <PlayerControls className={classes.buttons} />
        </Hidden>
        <Hidden on={breakpoints => breakpoints.create('maxHeight', 'xs')}>
          <PlayerTime current={current} />
        </Hidden>
      </div>
      <PlayerSlider current={current} />
      <Hidden on={breakpoints => breakpoints.create('minWidth', 'sm')}>
        <PlayerControls className={classes.buttons} />
      </Hidden>
    </Fragment>
  );
};

Player.defaultProps = {
  title: null,
  titlelocalized: null,
  artist: '',
  artistlocalized: '',
  image: null
};

Player.propTypes = {
  title: PropTypes.string,
  titlelocalized: PropTypes.string,
  artist: PropTypes.string,
  artistlocalized: PropTypes.string,
  image: propImage,
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired,
  position: PropTypes.number.isRequired,
  sliding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  image: state.player.metadata.images[0],
  artist: state.player.metadata.artist,
  artistlocalized: state.player.metadata.artistlocalized,
  title: state.player.metadata.title,
  titlelocalized: state.player.metadata.titlelocalized,
  status: state.player.status,
  position: state.player.position,
  sliding: state.player.sliding
});

export default connect(
  mapStateToProps
)(Player);
