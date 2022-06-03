import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { IPC, EVENTS, TYPES } from '@doombox-utils/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AudioContext } from '../context';
import { updateCache, setThumbar } from '../actions';
import {
  setMetadata,
  setStatus,
  setAutoplay,
  setPlaylist,
  setMuted,
  setVolume,
  setPosition,
  setPlaylistIndex
} from '../redux';
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
      getPosition: this.audio.position,
      setVolume: this.audio.setVolume,
      volumeUp: () => this.audio.setVolume(this.audio.volume + 0.05),
      volumeDown: () => this.audio.setVolume(this.audio.volume - 0.05),
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
    ipcRenderer.on(IPC.CHANNEL.AUDIO, (event, payload) => {
      switch (payload.action) {
        case IPC.ACTION.AUDIO.PREVIOUS:
          this.audio.previous();
          break;
        case IPC.ACTION.AUDIO.PAUSE:
          this.audio.pause();
          break;
        case IPC.ACTION.AUDIO.NEXT:
          this.audio.next();
          break;
        case IPC.ACTION.AUDIO.MUTE:
          this.audio.mute();
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
      dispatchMuted,
      dispatchPlaylist,
      dispatchPosition,
      dispatchMetadata,
      dispatchStatus,
      dispatchVolume,
      dispatchAutoplay,
      dispatchPlaylistIndex,
      useLocalizedMetadata
    } = props;
    const updateCacheMuted = debounce(
      muted => updateCache(TYPES.CACHE.PLAYER, { muted }),
      500
    );
    const updateCacheVolume = debounce(
      volume => updateCache(TYPES.CACHE.PLAYER, { volume }),
      500
    );

    this.audio.on(EVENTS.AUDIO.MUTED, muted => {
      updateCacheMuted(muted);
      dispatchMuted(muted);
    });
    this.audio.on(EVENTS.AUDIO.PLAYLIST, dispatchPlaylist);
    this.audio.on(EVENTS.AUDIO.INDEX, dispatchPlaylistIndex);
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
          metadata.album
      };

      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata(mediaMetadata);

      const images = metadata.images
        .map(id => this.props.images[id]);

      if (images[0]) {
        fetch(images[0].files.thumbnail)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();

            reader.onloadend = () => {
              // eslint-disable-next-line no-undef
              navigator.mediaSession.metadata = new MediaMetadata({
                ...mediaMetadata,
                artwork: [{
                  src: reader.result,
                  type: `image/${images[0].files.thumbnail.split('.').pop()}`,
                  sizes: '192x192'
                }]
              });
            };
            reader.readAsDataURL(blob);
          });
      }
    });
    this.audio.on(EVENTS.AUDIO.VOLUME, volume => {
      updateCacheVolume(volume);
      dispatchVolume(volume);
    });
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
  dispatchMuted: PropTypes.func.isRequired,
  dispatchPlaylist: PropTypes.func.isRequired,
  dispatchPosition: PropTypes.func.isRequired,
  dispatchMetadata: PropTypes.func.isRequired,
  dispatchStatus: PropTypes.func.isRequired,
  dispatchVolume: PropTypes.func.isRequired,
  dispatchAutoplay: PropTypes.func.isRequired,
  dispatchPlaylistIndex: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useLocalizedMetadata: state.config.display.useLocalizedMetadata,
  images: state.entities.images.map,
  autoplay: state.config.player.autoplay,
  muted: state.cache.player.muted,
  volume: state.cache.player.volume
});

const mapDispatchToProps = {
  dispatchMuted: setMuted,
  dispatchPlaylist: setPlaylist,
  dispatchPosition: setPosition,
  dispatchMetadata: setMetadata,
  dispatchStatus: setStatus,
  dispatchVolume: setVolume,
  dispatchAutoplay: setAutoplay,
  dispatchPlaylistIndex: setPlaylistIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioProvider);
