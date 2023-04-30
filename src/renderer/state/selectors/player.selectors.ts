import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

import { songSelector } from './song.selectors';

export const playerDurationSelector =
  createPropertySelector(store)(state => state.player.current.duration);

export const playerPositionSelector =
  createPropertySelector(store)(state => state.player.current.position);

export const playerStatusSelector =
  createPropertySelector(store)(state => state.player.status);

export const playerMutedSelector =
  createPropertySelector(store)(state => state.player.muted);

export const playerVolumeSelector =
  createPropertySelector(store)(state => state.player.volume);

export const playerSongSelector = createSelector(store)(
  () => {
    const { player } = store.get();
    if (!player.current.id) return null;
    return songSelector.get(player.current.id);
  },
  (prev, cur) => (
    songSelector.shouldUpdate(prev, cur) ||
    prev.player.current.id !== cur.player.current.id
  )
);
