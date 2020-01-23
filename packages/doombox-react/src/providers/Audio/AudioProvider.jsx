/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TYPE,
  ACTION
} from '@doombox/utils';

// Actions
import {
  readStorage,
  readCollection,
  updateStorage,
  updateRpc
} from '../../actions';

// Lib
import {
  Audio,
  Keybind
} from '../../lib';

// Utils
import { AudioContext } from '../../utils/context';
import { EVENT } from '../../utils/const';

// Electron
const { ipcRenderer } = window.require('electron');

class AudioProvider extends Component {
  /**
   * @param {Object} props
   * @param {Audio} props.audio
   * @param {Keybind} props.keybind
   */
  constructor(props) {
    super(props);

    const { audio, keybind } = props;
    this.audio = audio;
    this.keybind = keybind;

    this.state = {
      methodValue: {
        play: () => this.audio.play(),
        pause: () => this.audio.pause(),
        stop: () => this.audio.stop(),
        next: () => this.audio.next(),
        previous: () => this.audio.previous(),
        seek: newPosition => this.audio.seek(newPosition),
        setPlaylist: (name, collection, src) => this.audio.setPlaylist(name, collection, src),
        addPlaylist: collection => this.audio.addPlaylist(collection),
        goTo: newIndex => this.audio.goTo(newIndex),
        requestFrame: () => this.audio.requestFrame(),
        volume: newVolume => this.audio.setVolume(newVolume),
        autoplay: newAutoplay => this.audio.setAutoplay(newAutoplay),
        createSong: newSong => this.audio.newSong(newSong),
        mute: () => this.audio.mute(),
        shuffle: () => this.audio.shuffle(),
        increaseVolume: () => this.audio.setVolume(this.audio.volume + 0.01),
        decreaseVolume: () => this.audio.setVolume(this.audio.volume - 0.01),
      },
      libraryValue: [],
      currentValue: {},
      playlistValue: {
        name: 'Default Playlist',
        src: null,
        collection: []
      },
      collectionValue: [],
      volumeValue: this.audio.volume,
      playerValue: {
        status: this.audio.status,
        autoplay: this.audio.autoplay,
        duration: 0,
        muted: this.audio.muted
      },
      positionValue: 0
    };

    // Audio listeners
    this.audio.on(EVENT.AUDIO.STATUS, status => (
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, status }
      }))
    ));
    this.audio.on(EVENT.AUDIO.AUTOPLAY, autoplay => {
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, autoplay }
      }));
      updateStorage(TYPE.IPC.CACHE, TYPE.CONFIG.PLAYER, { autoplay });
    });
    this.audio.on(EVENT.AUDIO.PLAYLIST, playlist => (
      this.setState(state => ({ ...state, playlistValue: playlist }))
    ));
    this.audio.on(EVENT.AUDIO.VOLUME, volumeValue => {
      this.setState(state => ({ ...state, volumeValue }));
      updateStorage(TYPE.IPC.CACHE, TYPE.CONFIG.PLAYER, { volume: volumeValue });
    });
    this.audio.on(EVENT.AUDIO.POSITION, positionValue => (
      this.setState(state => ({ ...state, positionValue: positionValue || 0 }))
    ));
    this.audio.on(EVENT.AUDIO.DURATION, duration => (
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, duration }
      }))
    ));
    this.audio.on(EVENT.AUDIO.MUTED, muted => {
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, muted }
      }));
      updateStorage(TYPE.IPC.CACHE, TYPE.CONFIG.PLAYER, { muted });
    });
    this.audio.on(EVENT.AUDIO.CURRENT, currentValue => (
      this.setState(state => ({ ...state, currentValue }))
    ));
    this.audio.on(EVENT.AUDIO.RPC, status => updateRpc(status));

    // Keybind listeners
    this.keybind.on(ACTION.AUDIO.MUTE, () => this.audio.mute());
    this.keybind.on(ACTION.AUDIO.NEXT, () => this.audio.next());
    this.keybind.on(ACTION.AUDIO.PAUSE, () => this.audio.pause());
    this.keybind.on(ACTION.AUDIO.PLAY, () => this.audio.play());
    this.keybind.on(ACTION.AUDIO.PREVIOUS, () => this.audio.previous());
    this.keybind.on(ACTION.AUDIO.STOP, () => this.audio.stop());
    this.keybind.on(ACTION.AUDIO.VOLUME_DOWN, () => this.audio.setVolume(this.audio.volume - 1));
    this.keybind.on(ACTION.AUDIO.VOLUME_UP, () => this.audio.setVolume(this.audio.volume + 1));
  }

  componentDidMount() {
    ipcRenderer.once(TYPE.IPC.CACHE, (event, { payload }) => {
      this.setState(state => ({
        ...state,
        playerValue: payload[TYPE.CONFIG.PLAYER]
      }));
      this.setState(state => ({ ...state, volume: payload.volume }));
    });

    ipcRenderer.on(TYPE.IPC.CONFIG.USER, (event, { payload }) => {
      this.audio.rpc.imageKey = payload[TYPE.CONFIG.DISCORD][TYPE.OPTIONS.KEY_IMAGE] || null;
    });

    ipcRenderer.on(TYPE.IPC.LIBRARY, (event, payload) => {
      this.setState(state => ({ ...state, libraryValue: payload }));
    });

    ipcRenderer.on(TYPE.IPC.PLAYLIST, (event, payload) => {
      this.setState(state => ({
        ...state,
        collectionValue: payload
      }));
    });

    readStorage(TYPE.IPC.CACHE);

    readCollection(TYPE.IPC.LIBRARY);
    readCollection(TYPE.IPC.PLAYLIST);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;
    const {
      methodValue,
      playlistValue,
      collectionValue,
      libraryValue,
      volumeValue,
      currentValue,
      positionValue,
      playerValue
    } = this.state;

    return (
      <AudioContext.Method.Provider value={methodValue}>
        <AudioContext.Collection.Provider value={collectionValue}>
          <AudioContext.Library.Provider value={libraryValue}>
            <AudioContext.Playlist.Provider value={playlistValue}>
              <AudioContext.Volume.Provider value={volumeValue}>
                <AudioContext.Player.Provider value={playerValue}>
                  <AudioContext.Current.Provider value={currentValue}>
                    <AudioContext.Position.Provider value={positionValue}>
                      {children}
                    </AudioContext.Position.Provider>
                  </AudioContext.Current.Provider>
                </AudioContext.Player.Provider>
              </AudioContext.Volume.Provider>
            </AudioContext.Playlist.Provider>
          </AudioContext.Library.Provider>
        </AudioContext.Collection.Provider>
      </AudioContext.Method.Provider>
    );
  }
}

AudioProvider.propTypes = {
  children: PropTypes.element.isRequired,
  audio: PropTypes.instanceOf(Audio).isRequired,
  keybind: PropTypes.instanceOf(Keybind).isRequired
};

export default AudioProvider;
