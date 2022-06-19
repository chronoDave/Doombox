export const cx = (...args: unknown[]) => args
  .filter(x => typeof x === 'string' && x.length > 0)
  .join(' ');

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
