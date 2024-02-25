import type { Song } from '../../../types/library';

import levenshteinDistance from '../../../lib/string/levenshteinDistance';

export default (query: string) => (a: Song, b: Song) => {
  const distance = (x: Song) => x.title ?
    levenshteinDistance(x.title, query) :
    Number.MAX_SAFE_INTEGER;

  return distance(a) - distance(b);
};
