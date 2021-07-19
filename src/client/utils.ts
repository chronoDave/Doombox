export const parseHex = (hex: string) => {
  if (hex.length === 6) return hex;
  if (hex[0] !== '#' || !(hex.length === 4 || hex.length === 7)) {
    throw new Error(`Invalid hex: ${hex}`);
  }

  const raw = hex.slice(1);

  if (raw.length === 6) return raw;
  return raw.split('').map(c => c.repeat(2)).join('');
};

export const parseHexToRgb = (hex: string) => {
  const n = parseInt(parseHex(hex), 16);

  return ([
    (n >> 16) & 255,
    (n >> 8) & 255,
    n & 255
  ]);
};

export const hexToRgb = (hex: string) => parseHexToRgb(hex).join(', ');

export const cx = (...args: unknown[]) => args
  .filter(arg => typeof arg === 'string')
  .join(' ');
