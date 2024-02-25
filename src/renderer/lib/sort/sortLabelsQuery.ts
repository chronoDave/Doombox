import type { Label } from '../../../types/library';

import levenshteinDistance from '../../../lib/string/levenshteinDistance';

export default (query: string) => (a: Label, b: Label) => {
  const distance = (x: Label) => x.label ?
    levenshteinDistance(x.label, query) :
    Number.MAX_SAFE_INTEGER;

  return distance(a) - distance(b);
};
