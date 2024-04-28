import type { CacheShape } from '../../../types/shapes/cache.shape';

import produce from 'immer';

import clamp from '../../../lib/math/clamp';
import cacheShape from '../../../types/shapes/cache.shape';
import readFile from '../../lib/dom/fileReader/fileReader';
import Audio, { AudioStatus } from '../lib/audio/audio';
import { imageSelector } from '../selectors';
import store from '../store';

const updateCache = async (reducer: (state: CacheShape) => CacheShape) => {
  const cache = await window.ipc.cache.get();
  return window.ipc.cache.set(reducer(cache));
};

const audio = new Audio({
  ...store.get().user.player,
  ...cacheShape.player
})
  .on('duration', duration => store.dispatch(produce(draft => {
    draft.player.current.duration = duration;
  }), 'player.duration'))
  .on('position', position => store.dispatch(produce(draft => {
    draft.player.current.position = position;
  }), 'player.position'))
  .on('status', status => store.dispatch(produce(draft => {
    draft.player.status = status;
  }), 'player.status'));

export const play = async (id: string) => {
  const state = store.dispatch(produce(draft => {
    draft.player.current.id = id;
  }), 'player.play');

  const song = state.entities.song.get(id);

  if (song) {
    window.ipc.player.play();
    audio.play(song.file.replace(/#/g, '%23'));

    const metadata = {
      artist: song.artist ?? 'Unknown',
      title: song.title ?? 'Unknown',
      album: song.album ?? 'Unknown'
    };

    if (song.image) {
      const artwork = await Promise.all([96, 128, 192, 256, 384, 512].map(async size => {
        const response = await fetch(imageSelector(song.image!, size));
        const blob = await response.blob();
        const src = await readFile(blob);

        return ({ src, sizes: `${size}x${size}`, type: blob.type });
      }));

      navigator.mediaSession.metadata = new MediaMetadata({
        ...metadata,
        artwork: artwork ?? []
      });
    } else {
      navigator.mediaSession.metadata = new MediaMetadata(metadata);
    }
  }
};

export const pause = () => {
  const { player } = store.get();

  if (player.status === AudioStatus.Playing) {
    audio.pause();
    window.ipc.player.pause();
  } else {
    audio.resume();
    window.ipc.player.play();
  }
};

export const seek = (position: number) => {
  store.dispatch(produce(draft => {
    draft.player.current.position = position;
  }), 'player.seek');
  audio.seek(position);
};

export const mute = (muted?: boolean) => {
  const isMuted = muted ?? !store.get().player.muted;

  store.dispatch(produce(draft => {
    draft.player.muted = isMuted;
  }), 'player.mute');
  audio.mute(isMuted);
  updateCache(produce(draft => {
    draft.player.muted = isMuted;
  }));
};

export const setVolume = (n: number) => {
  const volume = clamp(0, 100, n);

  store.dispatch(produce(draft => {
    draft.player.volume = volume;
  }), 'player.volume');
  audio.volume = volume;
  updateCache(produce(draft => {
    draft.player.volume = volume;
  }));
};

export const skip = (n: number) => {
  const { queue } = store.get();
  if (queue.songs.length === 0) return;

  const i = clamp(0, queue.songs.length - 1, n);
  const id = queue.songs[i];

  store.dispatch(produce(draft => {
    draft.queue.index = i;
  }), 'player.skip');

  play(id);
};

export const next = () => {
  const { player, queue } = store.get();
  if (queue.songs.length === 0) return;

  let i = queue.index + 1;
  if (i === queue.songs.length) {
    i = player.loop ? 0 : queue.songs.length - 1;
    if (!player.loop) return;
  }

  skip(i);
};

export const previous = () => {
  const { player, queue } = store.get();
  if (queue.songs.length === 0) return;

  let i = queue.index - 1;
  if (i < 0) {
    i = player.loop ? queue.songs.length - 1 : 0;
    if (!player.loop) return;
  }

  skip(i);
};

store.subscribe((prev, cur) => (
  prev.player.status !== cur.player.status &&
  cur.player.status === AudioStatus.Ended &&
  cur.user.player.autoplay
) && next());

window.ipc.on.play(() => pause());
window.ipc.on.pause(() => pause());
window.ipc.on.previous(previous);
window.ipc.on.next(next);

navigator.mediaSession.setActionHandler('play', () => pause());
navigator.mediaSession.setActionHandler('pause', () => pause());
navigator.mediaSession.setActionHandler('previoustrack', () => previous());
navigator.mediaSession.setActionHandler('nexttrack', () => next());
