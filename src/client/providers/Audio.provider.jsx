import { ipcRenderer } from 'electron';

import React, { Component } from 'react';
import { IPC, EVENTS } from '@doombox-utils/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Context
import { AudioContext } from '../context';

// Actions
import { updateCache, setThumbar } from '../actions';

// Redux
import {
  setMetadata,
  setStatus,
  setAutoplay,
  setPlaylist,
  setDuration,
  setMuted,
  setVolume,
  setPosition
} from '../redux';

// Lib
import { Audio } from '../lib';

class AudioProvider extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio();

    this.methods = {
      play: this.audio.play,
      pause: this.audio.pause,
      stop: this.audio.stop,
      seek: this.audio.seek,
      setVolume: this.audio.setVolume,
      mute: this.audio.mute,
      add: this.audio.add,
      set: this.audio.set,
      next: this.audio.next,
      previous: this.audio.previous,
      skip: this.audio.skip,
      create: this.audio.create,
      shuffle: this.audio.shuffle
    };

    // Electron
    ipcRenderer.on(IPC.CHANNEL.WINDOW, (event, payload) => {
      switch (payload.action) {
        case IPC.ACTION.AUDIO.PREVIOUS:
          this.audio.previous();
          break;
        case IPC.ACTION.AUDIO.PLAY:
          this.audio.play();
          break;
        case IPC.ACTION.AUDIO.PAUSE:
          this.audio.pause();
          break;
        case IPC.ACTION.AUDIO.NEXT:
          this.audio.next();
          break;
        default:
          break;
      }
    });

    // MediaSession
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', this.audio.play);
      navigator.mediaSession.setActionHandler('pause', this.audio.pause);
      navigator.mediaSession.setActionHandler('stop', this.audio.stop);
      navigator.mediaSession.setActionHandler('nexttrack', this.audio.next);
      navigator.mediaSession.setActionHandler('previoustrack', this.audio.previous);
    }

    // Events
    const {
      dispatchDuration,
      dispatchMuted,
      dispatchPlaylist,
      dispatchPosition,
      dispatchMetadata,
      dispatchStatus,
      dispatchVolume,
      dispatchAutoplay,
      useLocalizedMetadata
    } = props;

    this.audio.on(EVENTS.AUDIO.DURATION, dispatchDuration);
    this.audio.on(EVENTS.AUDIO.MUTED, muted => {
      dispatchMuted(muted);
      updateCache('player.muted', muted);
    });
    this.audio.on(EVENTS.AUDIO.PLAYLIST, dispatchPlaylist);
    this.audio.on(EVENTS.AUDIO.POSITION, dispatchPosition);
    this.audio.on(EVENTS.AUDIO.METADATA, metadata => {
      dispatchMetadata(metadata);

      const mediaMetadata = {
        artist: useLocalizedMetadata ?
          (metadata.artistlocalized || metadata.artist) :
          metadata.artist,
        title: useLocalizedMetadata ?
          (metadata.titlelocalized || metadata.title) :
          metadata.title,
        album: useLocalizedMetadata ?
          (metadata.albumlocalized || metadata.album) :
          metadata.album,
      };

      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata(mediaMetadata);

      const cover = metadata.covers
        .map(id => this.props.images[id])
        .sort()[0];

      if (cover && cover.file) {
        fetch(cover.file)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();

            reader.onloadend = () => {
              // eslint-disable-next-line no-undef
              navigator.mediaSession.metadata = new MediaMetadata({
                ...mediaMetadata,
                artwork: [{ src: reader.result, type: `image/${cover.file.split('.').pop()}`, sizes: '192x192' }]
              });
            };
            reader.readAsDataURL(blob);
          });
      }
    });
    this.audio.on(EVENTS.AUDIO.VOLUME, dispatchVolume);
    this.audio.on(EVENTS.AUDIO.AUTOPLAY, dispatchAutoplay);
    this.audio.on(EVENTS.AUDIO.STATUS, status => {
      dispatchStatus(status);
      setThumbar(status);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.autoplay !== this.props.autoplay) {
      this.audio.autoplay = this.props.autoplay;
      this.props.dispatchAutoplay(this.props.autoplay);
    }
    if (prevProps.volume !== this.props.volume) {
      this.audio.volume = this.props.volume;
      this.props.dispatchVolume(this.props.volume);
    }
    if (prevProps.muted !== this.props.muted) {
      this.audio.muted = this.props.muted;
      this.props.dispatchMuted(this.props.muted);
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;

    return (
      <AudioContext.Provider value={this.methods}>
        {children}
      </AudioContext.Provider>
    );
  }
}

AudioProvider.propTypes = {
  useLocalizedMetadata: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  autoplay: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  muted: PropTypes.bool.isRequired,
  images: PropTypes.shape({}).isRequired,
  dispatchDuration: PropTypes.func.isRequired,
  dispatchMuted: PropTypes.func.isRequired,
  dispatchPlaylist: PropTypes.func.isRequired,
  dispatchPosition: PropTypes.func.isRequired,
  dispatchMetadata: PropTypes.func.isRequired,
  dispatchStatus: PropTypes.func.isRequired,
  dispatchVolume: PropTypes.func.isRequired,
  dispatchAutoplay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useLocalizedMetadata: state.config.display.useLocalizedMetadata,
  images: state.entities.images.map,
  autoplay: state.config.player.autoplay,
  muted: state.cache.player.muted,
  volume: state.cache.player.volume
});

const mapDispatchToProps = {
  dispatchDuration: setDuration,
  dispatchMuted: setMuted,
  dispatchPlaylist: setPlaylist,
  dispatchPosition: setPosition,
  dispatchMetadata: setMetadata,
  dispatchStatus: setStatus,
  dispatchVolume: setVolume,
  dispatchAutoplay: setAutoplay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioProvider);
