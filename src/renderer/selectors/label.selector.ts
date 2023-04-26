import type Store from '../lib/store';
import type { State } from '../types/state';

export const getLabels = (store: Store<State>) =>
  () => Array.from(store.get().entities.label.keys());

export const getLabel = (store: Store<State>) =>
  (id: string) => {
    const label = store.get().entities.label.get(id);

    if (!label) throw new Error(`Invalid id: ${id}`);
    return label;
  };
