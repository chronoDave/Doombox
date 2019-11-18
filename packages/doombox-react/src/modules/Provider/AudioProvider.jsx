import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import PropTypes from 'prop-types';

// Lib
import { Audio } from '../../lib/Audio';

// Utils
import { AudioContext } from '../../utils/context';
import { AUDIO_EVENTS } from '../../utils/const';

const defaultProps = {
  volume: 1,
  playlist: [
    { file: 'D:\\Users\\David\\Music\\Finished Music\\SQUARE ENIX\\[SQEX-10663] Masayoshi Soken, Nobuo Uematsu - Time and Again - Final Fantasy XIV Raid Dungeon Themes [2018]\\2.06 Moebius.flac' },
    { file: 'D:\\Users\\David\\Music\\Finished Music\\Moe Shop\\[2018] Moe Shop - Moe Moe\\Moe Shop - Moe Moe - 01 Magic (w- MYLK).mp3' }
  ],
  autoplay: true
};

let audio = new Audio(defaultProps);

const AudioProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [playlist, setPlaylist] = useState(defaultProps.playlist);
  const [volume, setVolume] = useState(defaultProps.volume);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Events
    audio.on(AUDIO_EVENTS.STATUS, newStatus => setStatus(newStatus));
    audio.on(AUDIO_EVENTS.PLAYLIST, newPlaylist => setPlaylist(newPlaylist));
    audio.on(AUDIO_EVENTS.VOLUME, newVolume => setVolume(newVolume));
    audio.on(AUDIO_EVENTS.POSITION, newPosition => setPosition(newPosition));
    audio.on(AUDIO_EVENTS.DURATION, newDuration => setDuration(newDuration));
    audio.on(AUDIO_EVENTS.MUTED, isMuted => setMuted(isMuted));

    // Cleanup
    return () => {
      audio = null;
    };
  }, [audio]);

  const methodValue = useMemo(() => ({
    play: () => audio.play(),
    pause: () => audio.pause(),
    stop: () => audio.stop(),
    next: () => audio.next(),
    previous: () => audio.previous(),
    seek: newPosition => audio.seek(newPosition),
    requestFrame: () => audio.requestFrame(),
    setVolume: newVolume => audio.setVolume(newVolume),
    increaseVolume: () => audio.increaseVolume(),
    decreaseVolume: () => audio.decreaseVolume(),
    mute: () => audio.mute(),
    shuffle: () => audio.shuffle()
  }), [audio]);

  const playlistValue = useMemo(() => playlist, [playlist]);

  const volumeValue = useMemo(() => volume, [volume]);

  const currentValue = useMemo(() => ({
    status, duration, muted
  }), [status, duration, muted]);

  const positionValue = useMemo(() => position, [position]);

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
};

AudioProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AudioProvider;
