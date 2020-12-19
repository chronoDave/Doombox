module.exports = (a, b, tags) => {
  const normalizeTag = tag => {
    if (typeof tag === 'string') return tag.toLowerCase();
    if (Array.isArray(tag)) return tag[0]; // Disc, Track
    return tag;
  };

  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i];
    const aTag = normalizeTag(a.metadata[tag]);
    const bTag = normalizeTag(b.metadata[tag]);

    if (typeof aTag === typeof bTag) {
      if (aTag > bTag) return 1;
      if (aTag < bTag) return -1;
    }
  }

  return 0;
};
