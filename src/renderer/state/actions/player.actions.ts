import produce from 'immer';

import cacheShape from '../../../types/shapes/cache.shape';
import clamp from '../../../utils/number/clamp';
import Audio, { AudioStatus } from '../../lib/audio';
import updateCache from '../../utils/updateCache';
import { songSelector } from '../selectors/song.selectors';
import store from '../store';

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

export const play = (id: string) => {
  store.dispatch(produce(draft => {
    draft.player.current.id = id;
  }), 'player.play');

  const { file } = songSelector.get(id);
  audio.play(file);
};

export const pause = () => {
  const { player } = store.get();

  if (player.status === AudioStatus.Playing) {
    audio.pause();
  } else {
    audio.resume();
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

export const volume = (n: number) => {
  store.dispatch(produce(draft => {
    draft.player.volume = n;
  }), 'player.volume');
  audio.volume = n;
  updateCache(produce(draft => {
    draft.player.volume = n;
  }));
};

export const skip = (n: number) => {
  const { playlist } = store.get();
  if (playlist.songs.length === 0) return;

  const i = clamp(0, playlist.songs.length - 1, n);
  const id = playlist.songs[i];

  store.dispatch(produce(draft => {
    draft.playlist.index = i;
  }), 'player.skip');

  play(id);
};

export const next = () => {
  const { player, playlist } = store.get();
  if (playlist.songs.length === 0) return;

  let i = playlist.index + 1;
  if (i === playlist.songs.length) i = player.loop ? 0 : playlist.songs.length - 1;

  skip(i);
};

export const previous = () => {
  const { player, playlist } = store.get();
  if (playlist.songs.length === 0) return;

  let i = playlist.index - 1;
  if (i < 0) i = player.loop ? playlist.songs.length - 1 : 0;

  skip(i);
};

store.subscribe((prev, cur) => (
  prev.player.status !== cur.player.status &&
  cur.player.status === AudioStatus.Ended &&
  cur.user.player.autoplay
) && next());
