import { theme } from '@doombox-config';

type ThemeKey =
  '--dark' |
  '--grey-100' |
  '--grey-200' |
  '--grey-300' |
  '--black' |
  '--white' |
  '--primary-main' |
  '--primary-text' |
  '--error-main' |
  '--error-text';

export const getTheme = (key: ThemeKey) => getComputedStyle(document.documentElement)
  .getPropertyValue(key);

export const setTheme = (key: ThemeKey, value: unknown) => document.documentElement.style
  .setProperty(key, `${value}`);

export const cx = (...args: Array<string | unknown>) => args
  .filter(className => className)
  .join(' ');

const normalizeHex = (hex: string) => {
  if (hex[0] !== '#') throw new Error(`Is not hex: ${hex}`);
  if (!(hex.length === 4 || hex.length === 7)) throw new Error(`Invalid hex: ${hex}`);

  const raw = hex.slice(1);
  if (raw.length === 6) return raw;
  return raw.split('').map(c => `${c}${c}`).join('');
};

const hexToRgbComponents = (hex: string) => {
  const n = parseInt(normalizeHex(hex), 16);

  return ([
    (n >> 16) & 255,
    (n >> 8) & 255,
    n & 255
  ]);
};

const hexToRgbString = (hex: string) => hexToRgbComponents(hex).join(', ');

export default () => {
  setTheme('--dark', theme.dark);
  setTheme('--grey-100', hexToRgbString(theme.palette.grey[100]));
  setTheme('--grey-200', hexToRgbString(theme.palette.grey[200]));
  setTheme('--grey-300', hexToRgbString(theme.palette.grey[300]));
  setTheme('--primary-main', hexToRgbString(theme.palette.primary.main));
  setTheme('--primary-text', hexToRgbString(theme.palette.primary.text));
  setTheme('--error-main', hexToRgbString(theme.palette.error.main));
  setTheme('--error-text', hexToRgbString(theme.palette.error.text));
};
