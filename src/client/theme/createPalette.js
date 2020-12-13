/* eslint-disable no-bitwise */
import { THEME as PALETTE } from '@doombox-config';

const opacity = {
  hover: 0.07,
  text: 0.14,
  inactive: 0.24,
  disabled: 0.54,
  overlay: 0.84
};

const expandHex = hex => (
  hex.length === 3 ?
    hex.split('').map(c => `${c}${c}`).join('') :
    hex
);

const hexToRgb = hex => {
  const int = parseInt(expandHex(hex.slice(1)), 16);

  return [
    (int >> 16) & 255,
    (int >> 8) & 255,
    int & 255
  ];
};

const lighten = (hex, n) => `rgb(${hexToRgb(hex)
  .map(int => Math.floor(int * n))
  .join(',')})`;

const darken = (hex, n) => `rgb(${hexToRgb(hex)
  .map(int => Math.floor(255 - int * n))
  .join(',')})`;

export default palette => {
  const defaultPalette = {
    ...PALETTE,
    ...palette,
  };

  return ({
    ...defaultPalette,
    opacity,
    text: {
      primary: defaultPalette.dark ?
        darken('#fff', opacity.text) :
        lighten('#000', opacity.text),
      inactive: defaultPalette.dark ?
        darken('#fff', opacity.inactive) :
        lighten('#000', opacity.inactive),
      disabled: defaultPalette.dark ?
        darken('#fff', opacity.disabled) :
        lighten('#000', opacity.disabled)
    },
    hexToRgb,
    lighten,
    darken,
    overlay: (hex, n) => `rgba(${hexToRgb(hex).join(',')},${n})`
  });
};
