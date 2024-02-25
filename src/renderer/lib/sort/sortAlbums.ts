import type { Album } from '../../../types/library';

export default (a: Album, b: Album) => {
  if (!a.label || !b.label) return 0;
  if (a.label !== b.label) return a.label.localeCompare(b.label);
  if (!a.year || !b.year) return 0;
  return a.year - b.year;
};
