import store from '../store';

export const getLabels = () => Array.from(store.get().entities.label.keys());

export const getLabel = (id: string) => {
  const label = store.get().entities.label.get(id);

  if (!label) throw new Error(`Invalid id: ${id}`);
  return label;
};
