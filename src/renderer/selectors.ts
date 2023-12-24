import type { State } from './types/state';
import type { Album, Label, Song } from '../types/library';

import { Thumb } from '../types/library';

import { AudioStatus } from './lib/audio';

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
  .reduce<Array<Song & { image: string }>>((acc, cur) => {
    const song = state.entities.song.get(cur);
    if (song) acc.push({ ...song, image: thumbSelector(state)(song.image) });
    return acc;
  }, []);

export const populateAlbums = (state: State) => (albums: string[]) => albums
  .reduce<Array<Album & { image: string }>>((acc, cur) => {
    const album = state.entities.album.get(cur);
    if (album) acc.push({ ...album, image: thumbSelector(state)(album.image) });
    return acc;
  }, []);

export const populateLabels = (state: State) => (labels: string[]) => labels
  .reduce<Label[]>((acc, cur) => {
    const label = state.entities.label.get(cur);
    if (label) acc.push(label);
    return acc;
  }, []);
