import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TYPES_IPC,
  COMMANDS_AUDIO
} from '@doombox/utils/const';

// Lib
import { Audio } from '../../lib/Audio';

// Utils
import { AudioContext } from '../../utils/context';
import { AUDIO_EVENTS } from '../../utils/const';

const { ipcRenderer } = window.require('electron');

class AudioProvider extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio(props.options);

    this.state = {
      methodValue: {
        play: () => this.audio.play(),
        pause: () => this.audio.pause(),
        stop: () => this.audio.stop(),
        next: () => this.audio.next(),
        previous: () => this.audio.previous(),
        seek: newPosition => this.audio.seek(newPosition),
        requestFrame: () => this.audio.requestFrame(),
        setVolume: newVolume => this.audio.setVolume(newVolume),
        increaseVolume: () => this.audio.increaseVolume(),
        decreaseVolume: () => this.audio.decreaseVolume(),
        mute: () => this.audio.mute(),
        shuffle: () => this.audio.shuffle()
      },
      playlistValue: props.options.playlist,
      volumeValue: props.options.volume,
      currentValue: {
        status: null,
        duration: 0,
        muted: props.options.muted
      },
      positionValue: 0
    };

    this.audio.on(AUDIO_EVENTS.STATUS, status => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, status }
      }))
    ));
    this.audio.on(AUDIO_EVENTS.PLAYLIST, playlistValue => (
      this.setState(state => ({ ...state, playlistValue }))
    ));
    this.audio.on(AUDIO_EVENTS.VOLUME, volumeValue => (
      this.setState(state => ({ ...state, volumeValue }))
    ));
    this.audio.on(AUDIO_EVENTS.POSITION, positionValue => (
      this.setState(state => ({ ...state, positionValue }))
    ));
    this.audio.on(AUDIO_EVENTS.DURATION, duration => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, duration }
      }))
    ));
    this.audio.on(AUDIO_EVENTS.MUTED, muted => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, muted }
      }))
    ));

    ipcRenderer.on(TYPES_IPC.KEYBOARD, (event, command) => {
      switch (command) {
        case COMMANDS_AUDIO.NEXT: return this.audio.next();
        case COMMANDS_AUDIO.PREVIOUS: return this.audio.previous();
        case COMMANDS_AUDIO.PLAY: return this.audio.play();
        case COMMANDS_AUDIO.PAUSE: return this.audio.pause();
        case COMMANDS_AUDIO.VOLUME_UP: return this.audio.increaseVolume();
        case COMMANDS_AUDIO.VOLUME_DOWN: return this.audio.decreaseVolume();
        case COMMANDS_AUDIO.MUTE: return this.audio.mute();
        default: return null;
      }
    });
  }

  render() {
    const { children } = this.props;
    const {
      methodValue,
      playlistValue,
      volumeValue,
      currentValue,
      positionValue
    } = this.state;

    return (
      <AudioContext.Method.Provider value={methodValue}>
        <AudioContext.Playlist.Provider value={playlistValue}>
          <AudioContext.Volume.Provider value={volumeValue}>
            <AudioContext.Current.Provider value={currentValue}>
              <AudioContext.Position.Provider value={positionValue}>
                {children}
              </AudioContext.Position.Provider>
            </AudioContext.Current.Provider>
          </AudioContext.Volume.Provider>
        </AudioContext.Playlist.Provider>
      </AudioContext.Method.Provider>
    );
  }
}

AudioProvider.propTypes = {
  children: PropTypes.element.isRequired,
  options: PropTypes.shape({
    playlist: PropTypes.arrayOf(PropTypes.shape({
      file: PropTypes.string
    })),
    volume: PropTypes.number,
    muted: PropTypes.bool
  }).isRequired
};

export default AudioProvider;
