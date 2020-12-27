module.exports = (tags, useLocalizedMetadata) => (a, b) => {
  const normalizeValue = (metadata, tag) => {
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
