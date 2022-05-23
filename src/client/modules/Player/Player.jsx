import url from 'url';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { STATUS } from '@doombox-utils/types';

import { useTranslation, useTimer } from '../../hooks';
import backgroundDefault from '../../assets/images/backgroundDefault.png';
import { propImage } from '../../validation/propTypes';
import PlayerControls from './components/PlayerControls/PlayerControls';
import PlayerTime from './components/PlayerTime/PlayerTime';
import PlayerSlider from './components/PlayerSlider/PlayerSlider';

import './Player.scss';

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
  const [current, { create, update, destroy }] = useTimer();
  const { t, getLocalizedTag } = useTranslation();

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

  const imagePath = image ?
    url.pathToFileURL(image.files.thumbnail).href :
    backgroundDefault;

  return (
    <Fragment>
      <div
        className="Player"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.42))',
            `url("${imagePath}")`
          ]
        }}
      >
        <div className="text">
          <p className="title">
            {(
              getLocalizedTag({ titlelocalized, title }, 'title') ||
              t('description.playlist_empty', { transform: 'capitalize' })
            )}
          </p>
          <p className="artist">
            {getLocalizedTag({ artistlocalized, artist }, 'artist') || ''}
          </p>
        </div>
        <PlayerControls />
        <PlayerTime current={current} />
      </div>
      <PlayerSlider current={current} />
      <PlayerControls />
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
