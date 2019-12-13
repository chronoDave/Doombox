import { useEffect } from 'react';

// Hooks
import {
  useAudio,
  useIpc
} from '../../hooks';

// Utils
import { pathToRemoteUrl } from '../../utils';
import { HOOK } from '../../utils/const';

const MediaSesssionListener = ({ children }) => {
  const {
    play,
    pause,
    stop,
    next,
    previous
  } = useAudio(HOOK.AUDIO.METHOD);
  const { images, metadata } = useAudio(HOOK.AUDIO.CURRENT);
  const { status } = useAudio(HOOK.AUDIO.PLAYER);
  const { getImageById } = useIpc(HOOK.IPC.METHOD);

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
      const playbackStates = ['none', 'paused', 'playing'];

      if (playbackStates.includes(status.toLowerCase())) {
        navigator.mediaSession.playbackState = status;
      } else {
        navigator.mediaSession.playbackState = 'none';
      }
    }
  }, [status]);

  useEffect(() => {
    if ('mediaSession' in navigator && metadata) {
      const {
        artist,
        album,
        title
      } = metadata;

      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({
        artist,
        album,
        title
      });

      if (images) {
        pathToRemoteUrl(getImageById(images[0]).path)
          .then(src => {
            navigator.mediaSession.metadata.artwork = [{ src, sizes: '128x128' }];
          });
      }
    }
  }, [metadata]);

  return children;
};

export default MediaSesssionListener;
