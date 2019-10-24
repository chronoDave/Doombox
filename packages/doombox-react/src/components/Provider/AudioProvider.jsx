import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Hooks
import { useSubscribeLibrary } from '../../hooks';

// Context
import { AudioContext } from './context';

// Lib
import { AudioEngine } from '../../lib';

// Validation
import { propLibrary } from '../../validation/propTypes';

const Audio = new AudioEngine();

const AudioProvider = ({ children, cache, collection }) => {
  useSubscribeLibrary();

  const [status, setStatus] = useState(Audio.status);
  const [current, setCurrent] = useState({});
  const [image, setImage] = useState({});
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(Audio.volume);
  const [muted, setMuted] = useState(Audio.muted);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    Audio.on('status', payload => setStatus(payload));
    Audio.on('current', payload => setCurrent(payload));
    Audio.on('image', payload => setImage(payload));
    Audio.on('position', payload => setPosition(payload));
    Audio.on('duration', payload => setDuration(payload));
    Audio.on('volume', payload => setVolume(payload));
    Audio.on('mute', payload => setMuted(payload));
    Audio.on('playlist', payload => setPlaylist(payload));
  }, []);

  useEffect(() => {
    if (!cache) Audio.stop();
  }, [cache]);

  useEffect(() => {
    if (collection) Audio.set(collection);
  }, [collection]);

  return (
    <AudioContext.Provider
      value={{
        set: payload => Audio.set(payload),
        add: payload => Audio.add(payload),
        next: () => Audio.next(),
        previous: () => Audio.previous(),
        skip: index => Audio.skipTo(index),
        play: () => Audio.play(),
        pause: () => Audio.pause(),
        stop: () => Audio.stop(),
        shuffle: () => Audio.shuffle(),
        seek: int => Audio.seek(int),
        mute: () => Audio.mute(),
        setVolume: int => Audio.setVolume(int),
        requestFrame: () => Audio.requestFrame(),
        playlist,
        status,
        current,
        image,
        position,
        duration,
        volume,
        muted
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired,
  cache: PropTypes.bool.isRequired,
  collection: propLibrary
};

AudioProvider.defaultProps = {
  collection: []
};

const mapStateToProps = state => ({
  cache: state.system.cache,
  collection: state.library.collection
});

export default connect(
  mapStateToProps
)(AudioProvider);
