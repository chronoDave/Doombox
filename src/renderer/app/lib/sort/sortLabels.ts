import type { Label } from '../../../../types/library';

export default (a: Label, b: Label) => {
  if (!a.label || !b.label) return 0;
  return a.label.localeCompare(b.label);
};
