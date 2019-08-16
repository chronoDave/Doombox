import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Context
import { AudioContext } from './AudioContext';

// Engine
import { AudioEngine } from './AudioEngine';

const Audio = new AudioEngine();

const AudioProvider = ({ children }) => {
  const [state, setState] = useState(Audio.state);
  const [current, setCurrent] = useState(Audio.current);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    Audio.on('state', newState => setState(newState));
    Audio.on('current', newCurrent => setCurrent(newCurrent));
    Audio.on('position', newPosition => setPosition(newPosition));
  }, []);

  return (
    <AudioContext.Provider
      value={{
        set: playlist => Audio.set(playlist),
        add: playlist => Audio.add(playlist),
        next: () => Audio.skip('next'),
        previous: () => Audio.skip('prev'),
        play: index => Audio.play(index),
        pause: () => Audio.pause(),
        stop: () => Audio.stop(),
        shuffle: () => Audio.shuffle(),
        current,
        position,
        state
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AudioProvider;
