import type { State } from './state';
import type { Album, Label, Song } from '@doombox/types/library';

import { AudioStatus } from '../../../lib/audio/audio';

export const imageSelector = (dir: string) => (id: string, size: number) =>
  new URL(`${id}/${size}.jpg`, `${dir}/`).href;

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
  }, []);

export const populateAlbums = (state: State) => (albums: string[]) => albums
  .reduce<Album[]>((acc, cur) => {
    const album = state.entities.album.get(cur);
    if (album) acc.push(album);
    return acc;
  }, []);

export const populateLabels = (state: State) => (labels: string[]) => labels
  .reduce<Label[]>((acc, cur) => {
    const label = state.entities.label.get(cur);
    if (label) acc.push(label);
    return acc;
  }, []);
