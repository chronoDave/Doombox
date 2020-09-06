import { ipcRenderer } from 'electron';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IPC, EVENTS } from '@doombox/utils';
import PropTypes from 'prop-types';

// Hooks
import { AudioContext } from '../hooks';

// Actions
import { setThumbar } from '../actions';

// Redux
import {
  setMetadata,
  setPlayer,
  setPlaylist,
  setVolume,
  setPosition
} from '../redux';

// Lib
import { Audio } from '../lib';

class AudioProvider extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio({
      autoplay: props.autoplay,
      volume: props.volume
    });

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
    this.audio.on(EVENTS.AUDIO.DURATION, duration => {
      props.setPlayer({ duration });
    });
    this.audio.on(EVENTS.AUDIO.MUTED, muted => {
      props.setPlayer({ muted });
    });
    this.audio.on(EVENTS.AUDIO.PLAYLIST, playlist => {
      props.setPlaylist(playlist);
    });
    this.audio.on(EVENTS.AUDIO.POSITION, position => {
      props.setPosition(position);
    });
    this.audio.on(EVENTS.AUDIO.METADATA, song => {
      props.setMetadata(song);
    });
    this.audio.on(EVENTS.AUDIO.STATUS, status => {
      props.setPlayer({ status });
      setThumbar(status);
    });
    this.audio.on(EVENTS.AUDIO.VOLUME, volume => {
      props.setVolume(volume);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.autoplay !== this.props.autoplay) this.audio.autoplay = this.props.autoplay;
    if (prevProps.volume !== this.props.volume) setVolume(this.props.volume);
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
  children: PropTypes.node.isRequired,
  autoplay: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  setMetadata: PropTypes.func.isRequired,
  setPlayer: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  autoplay: state.ipc.config.player.autoplay,
  volume: state.ipc.cache.volume
});

const mapDispatchToProps = {
  setMetadata,
  setPlayer,
  setPlaylist,
  setVolume,
  setPosition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioProvider);
