import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import PropTypes from 'prop-types';

// Context
import {
  AudioPositionContext,
  AudioCurrentContext,
  AudioVolumeContext,
  AudioPlaylistContext,
  AudioStaticContext
} from '../../utils/context';

// Lib
import Audio from '../../lib/Audio';

// Utils
import { AUDIO_STATUS } from '../../utils/const';

const initValues = {
  volume: 100,
  status: AUDIO_STATUS.STOPPED,
  muted: false,
  playlist: []
};

const audioEngine = new Audio(initValues);

const AudioProvider = ({ children }) => {
  const [audio, setAudio] = useState(audioEngine);
  const [status, setStatus] = useState(initValues.status);
  const [current, setCurrent] = useState(null);
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initValues.volume);
  const [muted, setMuted] = useState(initValues.muted);
  const [playlist, setPlaylist] = useState(initValues.playlist);

  useEffect(() => {
    // Events
    audio.on('status', newStatus => setStatus(newStatus));
    audio.on('current', newCurrent => setCurrent(newCurrent));
    audio.on('image', newImage => setImage(newImage));
    audio.on('position', newPosition => setPosition(newPosition));
    audio.on('duration', newDuration => setDuration(newDuration));
    audio.on('volume', newVolume => setVolume(newVolume));
    audio.on('playlist', newPlaylist => setPlaylist(newPlaylist));
    audio.on('mute', isMuted => setMuted(isMuted));

    // Cleanup
    return () => {
      setAudio(null);
    };
  }, []);

  const staticValues = useMemo(() => ({
    set: newPlaylist => audio.set(newPlaylist),
    add: newCollection => audio.add(newCollection),
    next: () => audio.next(),
    previous: () => audio.previous(),
    skip: newIndex => audio.skipTo(newIndex),
    play: () => audio.play(),
    pause: () => audio.pause(),
    stop: () => audio.stop(),
    shuffle: () => audio.shuffle(),
    seek: newPosition => audio.seek(newPosition),
    mute: () => audio.mute(),
    setVolume: newVolume => audio.setVolume(newVolume),
    requestFrame: () => audio.requestFrame()
  }), [audio]);

  const playlistValues = useMemo(() => ({
    playlist
  }), [playlist]);

  const volumeValues = useMemo(() => ({
    volume, muted
  }), [volume, muted]);

  const currentValues = useMemo(() => ({
    status, current, image
  }), [status, current, image]);

  const positionValues = useMemo(() => ({
    position, duration
  }), [position, duration]);

  return (
    <AudioStaticContext.Provider value={staticValues}>
      <AudioPlaylistContext.Provider value={playlistValues}>
        <AudioVolumeContext.Provider value={volumeValues}>
          <AudioCurrentContext.Provider value={currentValues}>
            <AudioPositionContext.Provider value={positionValues}>
              {children}
            </AudioPositionContext.Provider>
          </AudioCurrentContext.Provider>
        </AudioVolumeContext.Provider>
      </AudioPlaylistContext.Provider>
    </AudioStaticContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AudioProvider;
