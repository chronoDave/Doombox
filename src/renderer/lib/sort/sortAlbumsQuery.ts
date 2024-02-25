import type { Album } from '../../../types/library';

import levenshteinDistance from '../../../lib/string/levenshteinDistance';

export default (query: string) => (a: Album, b: Album) => {
  const distance = (x: Album) => x.album ?
    levenshteinDistance(x.album, query) :
    Number.MAX_SAFE_INTEGER;

  return distance(a) - distance(b);
};
