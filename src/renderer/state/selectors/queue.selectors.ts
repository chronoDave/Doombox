import createListSelector from '../../utils/createListSelector';
import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const queueSelector =
  createListSelector(store)(state => state.queue.songs);

export const queueIndexSelector =
  createPropertySelector(store)(state => state.queue.index);

export const queueIdSelector = createSelector(store)(
  () => queueSelector.get()[queueIndexSelector.get()],
  (prev, cur) => (
    queueSelector.shouldUpdate(prev, cur) ||
    queueIndexSelector.shouldUpdate(prev, cur)
  )
);
