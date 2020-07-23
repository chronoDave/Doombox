import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { IPC } from '@doombox/utils';
import PropTypes from 'prop-types';

// Lib
import { Audio } from '../lib';

// Actions
import { setThumbar } from '../actions';

// Redux
import {
  setSong,
  setPlayer,
  setPlaylist,
  setVolume,
  setPosition
} from '../redux';

// Utils
import { AudioContext } from '../utils/context';
import { EVENT } from '../utils/const';

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
      addPlaylist: this.audio.addPlaylist,
      setPlaylist: this.audio.setPlaylist,
      next: this.audio.next,
      previous: this.audio.previous,
      skipTo: this.audio.skipTo,
      create: this.audio.create
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
    this.audio.on(EVENT.AUDIO.DURATION, duration => {
      props.setPlayer({ duration });
    });
    this.audio.on(EVENT.AUDIO.MUTED, muted => {
      props.setPlayer({ muted });
    });
    this.audio.on(EVENT.AUDIO.PLAYLIST, playlist => {
      props.setPlaylist(playlist);
    });
    this.audio.on(EVENT.AUDIO.POSITION, position => {
      props.setPosition(position);
    });
    this.audio.on(EVENT.AUDIO.SONG, song => {
      props.setSong(song);
    });
    this.audio.on(EVENT.AUDIO.STATUS, status => {
      props.setPlayer({ status });
      setThumbar(status);
    });
    this.audio.on(EVENT.AUDIO.VOLUME, volume => {
      props.setVolume(volume);
    });
  }

  componentWillUnmount() {
    this.app.setThumbarButtons([]);
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

const mapDispatchToProps = {
  setSong,
  setPlayer,
  setPlaylist,
  setVolume,
  setPosition
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired,
  setSong: PropTypes.func.isRequired,
  setPlayer: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(AudioProvider);
