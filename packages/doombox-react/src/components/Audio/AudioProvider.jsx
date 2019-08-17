import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Types
import {
  create,
  IMAGE
} from '@doombox/utils/types';
import { READ } from '@doombox/utils/types/crudTypes';
import {
  ERROR,
  SUCCESS
} from '@doombox/utils/types/asyncTypes';

// Context
import { AudioContext } from './AudioContext';

// Engine
import { AudioEngine } from './AudioEngine';

// Api
import { fetchImage } from '../../api/imageApi';

const { ipcRenderer } = window.require('electron');

const Audio = new AudioEngine();

const AudioProvider = ({ children, connected }) => {
  const [state, setState] = useState(Audio.state);
  const [current, setCurrent] = useState({});
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState({});
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    ipcRenderer.on(
      create([SUCCESS, READ, IMAGE]),
      async (event, payload) => {
        setImage(payload);

        const src = await fetch(payload.file)
          .then(response => response.blob())
          .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }));

        navigator.mediaSession.metadata.artwork = [
          { src, sizes: '128x128' }
        ];
      }
    );
    ipcRenderer.on(
      create([ERROR, READ, IMAGE]),
      () => setImage({})
    );

    // Media session
    if ('mediaSession' in navigator) {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({});

      navigator.mediaSession.setActionHandler('play', () => Audio.play());
      navigator.mediaSession.setActionHandler('pause', () => Audio.pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => Audio.skip('prev'));
      navigator.mediaSession.setActionHandler('nexttrack', () => Audio.skip('next'));
    }

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([
        create([SUCCESS, READ, IMAGE]),
        create([ERROR, READ, IMAGE])
      ]);
      Audio.stop();
    };
  }, []);

  useEffect(() => {
    if (!connected) Audio.stop();
  }, [connected]);

  useEffect(() => {
    Audio.on('state', payload => setState(payload));
    Audio.on('current', payload => {
      if (payload.APIC) fetchImage(payload.APIC);

      navigator.mediaSession.metadata.title = payload.TIT2;
      navigator.mediaSession.metadata.artist = payload.TPE1;
      navigator.mediaSession.metadata.album = payload.TALB;

      setCurrent(payload);
    });
    Audio.on('position', payload => setPosition(Math.round(payload)));
    Audio.on('duration', payload => setDuration(payload));
    Audio.on('volume', payload => setVolume(payload));
    Audio.on('mute', payload => setMuted(payload));
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
        seek: int => Audio.seek(int),
        mute: () => Audio.mute(),
        setVolume: int => Audio.setVolume(int),
        requestFrame: () => Audio.requestFrame(),
        muted,
        volume,
        current,
        position,
        state,
        image,
        duration
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired,
  connected: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  connected: state.system.connected
});

export default connect(
  mapStateToProps
)(AudioProvider);
