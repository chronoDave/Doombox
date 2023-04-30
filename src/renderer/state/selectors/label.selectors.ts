import createMapSelector from '../../utils/createMapSelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const labelsSelector =
  createMapSelector(store)(state => state.entities.label);

export const labelSelector = createSelector(store)(
  (id: string) => {
    const label = store.get().entities.label.get(id);

    if (!label) throw new Error(`Invalid id: ${id}`);
    return label;
  },
  () => false
);
