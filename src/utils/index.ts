import crypto from 'crypto';

export const capitalize = (x: string) =>
  `${x[0].toUpperCase()}${x.slice(1)}`;

export const clamp = (min: number, max: number, n: number) =>
  Math.min(Math.max(n, min), max);

export const generateUid = (seed = crypto.randomBytes(20)) => crypto
  .createHash('md5')
  .update(seed)
  .digest('hex');

export const getCumulative = (array: number[], initialValue = 0) => {
  const cumulative = [initialValue];

  for (let i = 0; i < array.length; i += 1) {
    cumulative.push(array[i] + cumulative[i]);
  }

  return cumulative;
};

export const getLevenshteinDistance = (a: string, b: string) => {
  const matrix: number[][] = [];

  // Always check long => short
  const l1 = Math.max(a.length, b.length);
  const l2 = Math.min(a.length, b.length);

  // Fill matrix
  for (let i = 0; i <= l1; i += 1) {
    matrix[i] = [];

    for (let j = 0; j <= l2; j += 1) {
      matrix[i][j] = 0;
    }
  }

  // Insert prefixes
  for (let i = 1; i <= l1; i += 1) matrix[i][0] = i;
  for (let i = 1; i <= l2; i += 1) matrix[0][i] = i;

  // Find distance
  for (let j = 1; j <= l2; j += 1) {
    for (let i = 1; i <= l1; i += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1; // Check if letters are equal

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[l1][l2];
};

export const pascalize = (x: string, separator = ' ') => x
  .split(separator)
  .map(capitalize)
  .join(separator);

export const shuffle = <T>(x: T[]) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const shuffled = x.slice();
    for (let i = shuffled.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = shuffled[j];
      shuffled[j] = shuffled[i];
      shuffled[i] = swap;
    }
    if (
      shuffled.length <= 1 ||
      shuffled.some((v, i) => v !== x[i])
    ) return shuffled;
  }
};

export const sortMetadata = (
  tags: string[],
  useLocalizedMetadata: boolean
) => (
  a: Record<string, string>,
  b: Record<string, string>
) => {
  const normalizeValue = (metadata: Record<string, string>, tag: string) => {
    const value = metadata[tag];

    if (typeof value === 'number') return value;
    if (Array.isArray(value)) return value[0]; // disc, track
    return useLocalizedMetadata ?
      (metadata[`${tag}localized`] || value || '').toLowerCase() :
      (value || '').toLowerCase();
  };

  for (let i = 0; i < tags.length; i += 1) {
    const aTag = normalizeValue(a, tags[i]);
    const bTag = normalizeValue(b, tags[i]);

    if (aTag > bTag) return 1;
    if (aTag < bTag) return -1;
  }

  return 0;
};

export const toArray = <T>(x: T) => (Array.isArray(x) ? x : [x]);
