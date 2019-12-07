import {
  useMemo,
  useEffect
} from 'react';

// Hooks
import { useAudio } from '../../hooks/useContext';
import { HOOK } from '../../utils/const';

const MediaSesssionListener = ({ children }) => {
  const {
    play,
    pause,
    stop,
    next,
    previous
  } = useAudio(HOOK.AUDIO.METHOD);
  const {
    artist,
    album,
    title
  } = useAudio(HOOK.AUDIO.METADATA);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => play());
      navigator.mediaSession.setActionHandler('pause', () => pause());
      navigator.mediaSession.setActionHandler('stop', () => stop());
      navigator.mediaSession.setActionHandler('previoustrack', () => previous());
      navigator.mediaSession.setActionHandler('nexttrack', () => next());
    }
  }, [play, pause, stop, next, previous]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({ artist, album, title });
    }
  }, [artist, album, title]);

  return useMemo(() => children, []);
};

export default MediaSesssionListener;
