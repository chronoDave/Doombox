import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Context
import { AudioContext } from '../../utils/context';

// Lib
import Audio from '../../lib/Audio';

class AudioProvider extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio();
    this.state = {
      status: this.audio.status,
      current: {},
      image: {},
      position: 0,
      duration: 0,
      volume: this.audio.volume,
      muted: this.audio.muted,
      playlist: this.audio.playlist,
      set: playlist => this.audio.set(playlist),
      add: collection => this.audio.add(collection),
      next: () => this.audio.next(),
      previous: () => this.audio.previous(),
      skip: index => this.audio.skipTo(index),
      play: () => this.audio.play(),
      pause: () => this.audio.pause(),
      stop: () => this.audio.stop(),
      shuffle: () => this.audio.shuffle(),
      seek: position => this.audio.seek(position),
      mute: () => this.audio.mute(),
      setVolume: volume => this.audio.setVolume(volume),
      requestFrame: () => this.audio.requestFrame()
    };

    // Events
    this.audio.on('status', status => this.setState({ status }));
    this.audio.on('current', current => this.setState({ current }));
    this.audio.on('image', image => this.setState({ image }));
    this.audio.on('position', position => this.setState({ position }));
    this.audio.on('duration', duration => this.setState({ duration }));
    this.audio.on('volume', volume => this.setState({ volume }));
    this.audio.on('playlist', playlist => this.setState({ playlist }));
  }

  render() {
    const { children } = this.props;

    return (
      <AudioContext.Provider value={{ ...this.state }}>
        {children}
      </AudioContext.Provider>
    );
  }
}

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AudioProvider;
