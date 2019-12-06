import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Lib
import { Audio } from '../../lib';

// Utils
import { AudioContext } from '../../utils/context';
import { EVENT } from '../../utils/const';

const defaultProps = {
  volume: 1,
  playlist: [
    {
      file: 'D:\\Users\\David\\Music\\Finished Music\\Alex Metric\\[2012] Alex Metric - Ammunition EP\\Alex Metric - Anybody Else.mp3'
    }
  ],
  autoplay: true,
  muted: false
};

class AudioProvider extends Component {
  constructor() {
    super();

    this.audio = new Audio(defaultProps);

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
      metadataValue: {},
      playlistValue: defaultProps.playlist,
      volumeValue: defaultProps.volume,
      currentValue: {
        status: null,
        duration: 0,
        muted: defaultProps.muted
      },
      positionValue: 0
    };

    this.audio.on(EVENT.AUDIO.STATUS, status => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, status }
      }))
    ));
    this.audio.on(EVENT.AUDIO.PLAYLIST, playlistValue => (
      this.setState(state => ({ ...state, playlistValue }))
    ));
    this.audio.on(EVENT.AUDIO.VOLUME, volumeValue => (
      this.setState(state => ({ ...state, volumeValue }))
    ));
    this.audio.on(EVENT.AUDIO.POSITION, positionValue => (
      this.setState(state => ({ ...state, positionValue }))
    ));
    this.audio.on(EVENT.AUDIO.DURATION, duration => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, duration }
      }))
    ));
    this.audio.on(EVENT.AUDIO.MUTED, muted => (
      this.setState(state => ({
        ...state,
        currentValue: { ...state.currentValue, muted }
      }))
    ));
    this.audio.on(EVENT.AUDIO.METADATA, metadataValue => (
      this.setState(state => ({ ...state, metadataValue }))
    ));
  }

  render() {
    const { children } = this.props;
    const {
      methodValue,
      playlistValue,
      volumeValue,
      currentValue,
      positionValue,
      metadataValue
    } = this.state;

    return (
      <AudioContext.Method.Provider value={methodValue}>
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
      </AudioContext.Method.Provider>
    );
  }
}

AudioProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AudioProvider;
