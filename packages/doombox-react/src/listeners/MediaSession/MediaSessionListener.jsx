import { useEffect } from 'react';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { pathToRemoteUrl } from '../../utils';
import { HOOK } from '../../utils/const';

const MediaSesssionListener = ({ children }) => {
  const {
    play,
    pause,
    stop,
    next,
    previous,
    getImage
  } = useAudio(HOOK.AUDIO.METHOD);
  const { images, metadata } = useAudio(HOOK.AUDIO.METADATA);
  const { status } = useAudio(HOOK.AUDIO.CURRENT);

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
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = status;
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
        pathToRemoteUrl(getImage(images[0]).path)
          .then(src => {
            navigator.mediaSession.metadata.artwork = [{ src, sizes: '128x128' }];
            console.log(navigator.mediaSession);
          });
      }
    }
  }, [metadata]);

  return children;
};

export default MediaSesssionListener;
