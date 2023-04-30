import createListSelector from '../../utils/createListSelector';
import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const playlistSelector =
  createListSelector(store)(state => state.playlist.songs);

export const playlistIndexSelector =
  createPropertySelector(store)(state => state.playlist.index);

export const playlistIdSelector = createSelector(store)(
  () => playlistSelector.get()[playlistIndexSelector.get()],
  (prev, cur) => (
    playlistSelector.shouldUpdate(prev, cur) ||
    playlistIndexSelector.shouldUpdate(prev, cur)
  )
);
