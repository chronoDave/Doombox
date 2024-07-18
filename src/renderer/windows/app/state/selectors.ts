import type { State } from './state';

import { AudioStatus } from '../../../lib/audio/audio';

export const imageSelector = (dir: string) => (id: string, size: number) =>
  new URL(`${id}/${size}.jpg`, `${dir}/`).href;

export const currentPlayerSelector = (state: State) => () =>
  state.entities.song.get(state.player.current.id ?? '');

export const hasAutoplay = (state: State) => () =>
  state.queue.songs.length === 0 &&
  state.player.status !== AudioStatus.Playing;
