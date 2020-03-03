import React, { Component } from 'react';
import {
  TYPE,
  ACTION
} from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {
  setRpc,
  updateConfig
} from '../../actions';

// Redux
import {
  setPlaylist,
  shufflePlaylist
} from '../../redux';

// Lib
import { Audio } from '../../lib';

// Utils
import { pathToRemoteUrl } from '../../utils';
import { AudioContext } from '../../utils/context';
import {
  EVENT,
  MEDIA_SESSION
} from '../../utils/const';

// Validation
import {
  propSong,
  propImage
} from '../../validation/propTypes';

const { ipcRenderer } = window.require('electron');

class AudioProvider extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio();

    // MediaSession
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.audio.play());
      navigator.mediaSession.setActionHandler('pause', () => this.audio.pause());
      navigator.mediaSession.setActionHandler('stop', () => this.audio.stop());
      navigator.mediaSession.setActionHandler('previoustrack', () => this.audio.previous());
      navigator.mediaSession.setActionHandler('nexttrack', () => this.audio.next());
    }

    this.state = {
      methodValue: {
        // General
        play: () => this.audio.play(),
        pause: () => this.audio.pause(),
        stop: () => this.audio.stop(),
        next: () => this.audio.next(),
        previous: () => this.audio.previous(),
        seek: newPosition => this.audio.seek(newPosition),
        // Volume
        volume: newVolume => this.audio.setVolume(newVolume),
        mute: () => this.audio.mute(),
        increaseVolume: () => this.audio.setVolume(this.audio.volume + 0.01),
        decreaseVolume: () => this.audio.setVolume(this.audio.volume - 0.01),
        // Playlist
        goTo: newIndex => this.audio.goTo(newIndex),
        shuffle: () => {
          const { dispatchShufflePlaylist } = props;
          dispatchShufflePlaylist();
        },
        // Misc
        requestFrame: () => this.audio.requestFrame(),
        autoplay: newAutoplay => this.audio.setAutoplay(newAutoplay),
        createSong: newSong => this.audio.newSong(newSong)
      },
      currentValue: {},
      playerValue: {
        status: this.audio.status,
        autoplay: this.audio.autoplay,
        duration: 0,
        muted: this.audio.muted
      },
      volumeValue: this.audio.volume,
      positionValue: 0
    };

    // Keybind
    ipcRenderer.on(TYPE.IPC.KEYBIND, (event, payload) => {
      switch (payload.action) {
        // General
        case ACTION.AUDIO.PLAY: return this.audio.play();
        case ACTION.AUDIO.PAUSE: return this.audio.pause();
        case ACTION.AUDIO.STOP: return this.audio.stop();
        case ACTION.AUDIO.NEXT: return this.audio.next();
        case ACTION.AUDIO.PREVIOUS: return this.audio.previous();
        // Volume
        case ACTION.AUDIO.VOLUME_UP: return this.audio.setVolume(this.audio.volume + 0.01);
        case ACTION.AUDIO.VOLUME_DOWN: return this.audio.setVolume(this.audio.volume - 0.01);
        case ACTION.AUDIO.MUTE: return this.audio.mute();
        default: return null;
      }
    });

    // Current
    this.audio.on(EVENT.AUDIO.CURRENT, currentValue => {
      if ('mediaSession' in navigator) {
        // eslint-disable-next-line no-undef
        navigator.mediaSession.metadata = new MediaMetadata({
          artist: currentValue.metadata.artist,
          album: currentValue.metadata.album,
          title: currentValue.metadata.title
        });
        navigator.mediaSession.playbackState = 'playing';
        pathToRemoteUrl(currentValue.images[0].path)
          .then(src => {
            navigator.mediaSession.metadata.artwork = MEDIA_SESSION.SIZES
              .map(sizes => ({ src, sizes, type: 'image/jpeg' }));
          })
          // eslint-disable-next-line no-console
          .catch(console.error);
      }

      this.setState(state => ({ ...state, currentValue }));
    });
    // Playlist
    this.audio.on(EVENT.AUDIO.PLAYLIST, playlist => {
      const { dispatchPlaylist } = this.props;
      dispatchPlaylist(playlist);
    });
    // Player
    this.audio.on(EVENT.AUDIO.STATUS, status => {
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, status }
      }));
    });
    this.audio.on(EVENT.AUDIO.AUTOPLAY, autoplay => {
      updateConfig.player({ autoplay });
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, autoplay }
      }));
    });
    this.audio.on(EVENT.AUDIO.DURATION, duration => {
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, duration }
      }));
    });
    this.audio.on(EVENT.AUDIO.MUTED, muted => {
      this.setState(state => ({
        ...state,
        playerValue: { ...state.playerValue, muted }
      }));
    });
    // Volume
    this.audio.on(EVENT.AUDIO.VOLUME, volumeValue => {
      updateConfig.player({ volume: volumeValue });
      this.setState(state => ({ ...state, volumeValue }));
    });
    // Position
    this.audio.on(EVENT.AUDIO.POSITION, positionValue => {
      this.setState(state => ({ ...state, positionValue }));
    });
    // Rpc
    this.audio.on(EVENT.AUDIO.RPC, message => {
      const {
        artist,
        album,
        title,
        albumartist,
        smallImageKey,
        smallImageText,
        startTimestamp,
        endTimestamp
      } = message;

      const payload = {
        smallImageKey,
        smallImageText,
        largeImageKey: 'icon',
        largeImageText: `Label: ${albumartist}`,
        state: `${artist} - ${title}`,
        details: `${album}`
      };

      if (startTimestamp) payload.startTimestamp = startTimestamp;
      if (endTimestamp) payload.endTimestamp = endTimestamp;

      setRpc(payload);
    });
  }

  componentDidUpdate(prevProps) {
    const { playlist } = this.props;

    if (prevProps.playlist === playlist) return;

    const {
      action,
      name,
      collection,
      cover,
      autoplay
    } = playlist;

    if (action === ACTION.AUDIO.SHUFFLE) this.audio.shuffle(collection);
    if (action === ACTION.PLAYLIST.ADD) this.audio.addPlaylist(collection);
    if (action === ACTION.PLAYLIST.SET) {
      this.audio.setPlaylist({
        name,
        cover,
        collection
      }, autoplay);
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;
    const {
      methodValue,
      currentValue,
      playerValue,
      volumeValue,
      positionValue
    } = this.state;

    return (
      <AudioContext.Method.Provider value={methodValue}>
        <AudioContext.Current.Provider value={currentValue}>
          <AudioContext.Player.Provider value={playerValue}>
            <AudioContext.Volume.Provider value={volumeValue}>
              <AudioContext.Position.Provider value={positionValue}>
                {children}
              </AudioContext.Position.Provider>
            </AudioContext.Volume.Provider>
          </AudioContext.Player.Provider>
        </AudioContext.Current.Provider>
      </AudioContext.Method.Provider>
    );
  }
}

AudioProvider.propTypes = {
  children: PropTypes.element.isRequired,
  dispatchPlaylist: PropTypes.func.isRequired,
  dispatchShufflePlaylist: PropTypes.func.isRequired,
  playlist: PropTypes.shape({
    action: PropTypes.string,
    name: PropTypes.string,
    cover: propImage,
    collection: PropTypes.arrayOf(propSong),
    autoplay: PropTypes.bool
  })
};

AudioProvider.defaultProps = {
  playlist: {}
};

const mapStateToProps = state => ({
  playlist: state.playlist
});

const mapDispatchToProps = {
  dispatchPlaylist: setPlaylist,
  dispatchShufflePlaylist: shufflePlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioProvider);
