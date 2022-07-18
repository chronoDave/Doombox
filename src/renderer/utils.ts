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

export const MIXINS = {
  slider: {
    track: 4,
    thumb: 8
  },
  toggle: {
    body: 30,
    thumb: 12
  },
  player: {
    xs: { width: 164, height: 164 },
    sm: { width: 210, height: 210 },
    md: { width: 300, height: 300 }
  },
  virtual: {
    item: 24
  },
  albums: {
    item: {
      xs: { width: 128, height: 48, padding: 1 },
      sm: { width: 128, height: 96, padding: 2 },
      lg: { width: 128, height: 128, padding: 4 }
    }
  },
  library: {
    header: {
      xs: { height: 44, padding: 2 },
      sm: { height: 48, padding: 4 },
      lg: { height: 52, padding: 8 }
    },
    body: {
      xs: { padding: 0 },
      sm: { padding: 4 },
      lg: { padding: 8 }
    },
    item: {
      xs: { width: 74, height: 74, padding: 1 },
      sm: { width: 124, height: 124, padding: 1 },
      lg: { width: 336, height: 150, padding: 2 }
    }
  }
} as const;
