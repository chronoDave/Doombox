import { THEME as PALETTE } from '@doombox-config';

const hexToRgb = hex => {
  const int = parseInt(hex.slice(1), 16);
  // eslint-disable-next-line no-bitwise
  return `${(int >> 16) & 255},${(int >> 8) & 255},${int & 255}`;
};

export default palette => ({
  ...PALETTE,
  ...palette,
  opacity: {
    inactive: 0.42,
    hover: 0.14
  },
  hexToRgb,
  fade: (hex, opacity) => `rgba(${hexToRgb(hex)},${opacity})`
});
