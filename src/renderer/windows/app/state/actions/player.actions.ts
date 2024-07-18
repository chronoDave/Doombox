import type { CacheShape } from '@doombox/types/shapes/cache.shape';

import produce from 'immer';

import clamp from '@doombox/lib/math/clamp';
import wrap from '@doombox/lib/math/wrap';
import readFile from '@doombox/renderer/dom/fileReader/fileReader';
import cacheShape from '@doombox/types/shapes/cache.shape';

import Audio, { AudioStatus } from '../../../../lib/audio/audio';
import store from '../store';

const updateCache = async (reducer: (state: CacheShape) => CacheShape) => {
  const cache = await window.ipc.cache.get();
  return window.ipc.cache.set(reducer(cache));
};

const audio = new Audio(cacheShape.player)
  .on('duration', duration => store.set(produce(draft => {
    draft.player.current.duration = duration;
  })))
  .on('position', position => store.set(produce(draft => {
    draft.player.current.position = position;
  })))
  .on('status', status => store.set(produce(draft => {
    draft.player.status = status;
  })));

export const play = async (id: string) => {
  store.set(produce(draft => {
    draft.player.current.id = id;
  }));

  const song = store.state.entities.song.get(id);

  if (song) {
    window.ipc.player.play();
    audio.play(song.file.replace(/#/g, '%23'));

    const metadata = {
      artist: song.artist ?? 'Unknown',
      title: song.title ?? 'Unknown',
      album: song.album ?? 'Unknown'
    };

    if (song.image) {
      const dir = await window.ipc.os.image();
      const artwork = await Promise.all([96, 128, 192, 256, 384, 512].map(async size => {
        const response = await fetch(new URL(`${song.image!}/${size}.jpg`, `${dir}/`).href);
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
  store.set(produce(draft => {
    draft.player.muted = !draft.player.muted;
  }));

  if (store.state.player.status === AudioStatus.Playing) {
    audio.pause();
    window.ipc.player.pause();
  } else {
    audio.resume();
    window.ipc.player.play();
  }
};

export const seek = (position: number) => {
  store.set(produce(draft => {
    draft.player.current.position = position;
  }));
  audio.seek(position);
};

export const mute = (muted?: boolean) => {
  store.set(produce(draft => {
    draft.player.muted = muted ?? !draft.player.muted;
  }));

  audio.mute(store.state.player.muted);
  updateCache(produce(draft => {
    draft.player.muted = store.state.player.muted;
  }));
};

export const setVolume = (n: number) => {
  const volume = clamp(0, 100, n);

  store.set(produce(draft => {
    draft.player.volume = volume;
  }));
  audio.volume = volume;
  updateCache(produce(draft => {
    draft.player.volume = volume;
  }));
};

export const skip = (n: number) => {
  store.set(produce(draft => {
    draft.queue.index = clamp(0, draft.queue.songs.length - 1, n);
  }));
  const id = store.state.queue.songs[store.state.queue.index];

  play(id);
};

export const next = () => {
  store.set(produce(draft => {
    draft.queue.index = draft.player.loop ?
      wrap(0, draft.queue.songs.length - 1, draft.queue.index + 1) :
      Math.max(draft.queue.songs.length - 1, draft.queue.index + 1);
  }));
  const id = store.state.queue.songs[store.state.queue.index];

  play(id);
};

export const previous = () => {
  store.set(produce(draft => {
    draft.queue.index = draft.player.loop ?
      wrap(0, draft.queue.songs.length - 1, draft.queue.index - 1) :
      Math.min(0, draft.queue.index - 1);
  }));
  const id = store.state.queue.songs[store.state.queue.index];

  play(id);
};

store.on((cur, prev) => (
  prev.player.status !== cur.player.status &&
  cur.player.status === AudioStatus.Ended &&
  cur.user.player.autoplay
) && next());

window.ipc.on.player.play(() => pause());
window.ipc.on.player.pause(() => pause());
window.ipc.on.player.previous(previous);
window.ipc.on.player.next(next);

navigator.mediaSession.setActionHandler('play', () => pause());
navigator.mediaSession.setActionHandler('pause', () => pause());
navigator.mediaSession.setActionHandler('previoustrack', () => previous());
navigator.mediaSession.setActionHandler('nexttrack', () => next());
