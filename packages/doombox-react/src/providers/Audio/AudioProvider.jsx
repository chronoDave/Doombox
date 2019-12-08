import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TYPE, ACTION } from '@doombox/utils';

// Lib
import { Audio } from '../../lib';

// Utils
import { AudioContext } from '../../utils/context';
import { EVENT } from '../../utils/const';

// Electron
const { ipcRenderer } = window.require('electron');

class AudioProvider extends Component {
  constructor() {
    super();

    const sendIpcUpdate = payload => ipcRenderer.send(
      TYPE.IPC.SYSTEM, {
        action: ACTION.CRUD.UPDATE,
        data: { key: 'player', payload }
      }
    );

    this.audio = new Audio();

    this.state = {
      methodValue: {
        play: () => this.audio.play(),
        pause: () => this.audio.pause(),
        stop: () => this.audio.stop(),
        next: () => this.audio.next(),
        previous: () => this.audio.previous(),
        seek: newPosition => this.audio.seek(newPosition),
        setPlaylist: newPlaylist => this.audio.setPlaylist(newPlaylist),
        requestFrame: () => this.audio.requestFrame(),
        setVolume: newVolume => this.audio.setVolume(newVolume),
        setAutoplay: newAutoplay => this.audio.setAutoplay(newAutoplay),
        increaseVolume: () => this.audio.increaseVolume(),
        decreaseVolume: () => this.audio.decreaseVolume(),
        mute: () => this.audio.mute(),
        shuffle: () => this.audio.shuffle()
      },
      libraryValue: [],
      metadataValue: {},
      playlistValue: this.audio.playlist,
      volumeValue: this.audio.volume,
      currentValue: {
        status: this.audio.status,
        autoplay: this.audio.autoplay,
        duration: 0,
        muted: this.audio.muted
      },
      positionValue: 0
    };

    this.audio.on(EVENT.AUDIO.STATUS, status => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, status }
      }))
    ));
    this.audio.on(EVENT.AUDIO.AUTOPLAY, autoplay => {
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, autoplay }
      }));
      sendIpcUpdate({ autoplay });
    });
    this.audio.on(EVENT.AUDIO.PLAYLIST, playlistValue => (
      this.setState(state => ({ ...state, playlistValue }))
    ));
    this.audio.on(EVENT.AUDIO.VOLUME, volumeValue => {
      this.setState(state => ({ ...state, volumeValue }));
      sendIpcUpdate({ volume: volumeValue });
    });
    this.audio.on(EVENT.AUDIO.POSITION, positionValue => (
      this.setState(state => ({ ...state, positionValue }))
    ));
    this.audio.on(EVENT.AUDIO.DURATION, duration => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, duration }
      }))
    ));
    this.audio.on(EVENT.AUDIO.MUTED, muted => {
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, muted }
      }));
      sendIpcUpdate({ muted });
    });
    this.audio.on(EVENT.AUDIO.METADATA, metadataValue => (
      this.setState(state => ({ ...state, metadataValue }))
    ));
  }

  componentDidMount() {
    ipcRenderer.once(TYPE.IPC.SYSTEM, (event, payload) => {
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, ...payload }
      }));
      this.setState(state => ({ ...state, volume: payload.volume }));
    });

    ipcRenderer.on(TYPE.IPC.LIBRARY, (event, payload) => {
      this.audio.setPlaylist(payload);
      this.setState(state => ({ ...state, library: payload }));
    });

    ipcRenderer.send(TYPE.IPC.SYSTEM, {
      action: ACTION.CRUD.READ,
      data: { key: 'player' }
    });

    ipcRenderer.send(TYPE.IPC.LIBRARY, { action: ACTION.CRUD.READ, data: {} });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(TYPE.IPC.SYSTEM);
  }

  render() {
    const { children } = this.props;
    const {
      methodValue,
      playlistValue,
      libraryValue,
      volumeValue,
      currentValue,
      positionValue,
      metadataValue
    } = this.state;

    return (
      <AudioContext.Method.Provider value={methodValue}>
        <AudioContext.Library.Provider value={libraryValue}>
          <AudioContext.Playlist.Provider value={playlistValue}>
            <AudioContext.Volume.Provider value={volumeValue}>
              <AudioContext.Metadata.Provider value={metadataValue}>
                <AudioContext.Current.Provider value={currentValue}>
                  <AudioContext.Position.Provider value={positionValue}>
                    {children}
                  </AudioContext.Position.Provider>
                </AudioContext.Current.Provider>
              </AudioContext.Metadata.Provider>
            </AudioContext.Volume.Provider>
          </AudioContext.Playlist.Provider>
        </AudioContext.Library.Provider>
      </AudioContext.Method.Provider>
    );
  }
}

AudioProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AudioProvider;
