import type { State } from './types/state';
import type { Song } from '../types/library';

import { Thumb } from '../types/library';

import { AudioStatus } from './lib/audio';
import { sortSongs } from './utils/sort';

export const thumbSelector = (state: State) => (id: string | null) => {
  if (!id || !state.app.directory.thumbs) return 'icons/icon_light.png';
  return new URL(`${id}x${Thumb.Album}.jpg`, `${state.app.directory.thumbs}/`).href;
};

export const currentPlayerSelector = (state: State) => () =>
  state.entities.song.get(state.player.current.id ?? '');

export const hasAutoplay = (state: State) => () =>
  state.queue.songs.length === 0 &&
  state.player.status !== AudioStatus.Playing;

export const populateSongs = (state: State) => (songs: string[]) => songs
  .reduce<Song[]>((acc, cur) => {
    const song = state.entities.song.get(cur);
    if (song) acc.push(song);
    return acc;
  }, [])
  .sort(sortSongs);
