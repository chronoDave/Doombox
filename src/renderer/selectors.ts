import type { State } from './types/state';

import { Thumb } from '../types/library';

export const thumbSelector = (state: State) => (id: string | null) => {
  if (!id || !state.app.directory.thumbs) return 'icons/icon_light.png';
  return new URL(`${id}x${Thumb.Album}.jpg`, `${state.app.directory.thumbs}/`).href;
};

export const currentPlayerSelector = (state: State) => () =>
  state.entities.song.get(state.player.current.id ?? '');
