/* eslint-disable no-bitwise */
import { THEME } from '@doombox-config';

const opacity = {
  hover: 0.09,
  inactive: 0.34,
  overlay: 0.92,
  primary: 0.33,
  secondary: 0.66
};

const normalizeHex = hex => {
  const hexString = hex.slice(1);

  if (hexString.length === 3) {
    return hexString
      .split('')
      .map(c => `${c}${c}`)
      .join('');
  }
  return hexString;
};

const hexToRgb = hex => {
  const int = parseInt(normalizeHex(hex), 16);

  return [
    (int >> 16) & 255,
    (int >> 8) & 255,
    int & 255
  ];
};

const alpha = (hex, n) => `rgba(${hexToRgb(hex).join(',')},${opacity[n] || n})`;

const luminanace = hex => {
  const a = hexToRgb(hex)
    .map(c => {
      const l = c / 255;

      if (l <= 0.03928) return l / 12.92;
      return (l + 0.055) / 1.055 ** 2.4;
    });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (hex1, hex2) => {
  const lum1 = luminanace(hex1);
  const lum2 = luminanace(hex2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export default theme => {
  const defaults = THEME[theme] || THEME.dark;

  return ({
    ...defaults,
    opacity,
    text: {
      primary: defaults.dark ?
        defaults.grey[6] :
        defaults.grey[0],
      secondary: defaults.dark ?
        defaults.grey[5] :
        defaults.grey[1],
      disabled: defaults.dark ?
        defaults.grey[4] :
        defaults.grey[2]
    },
    actions: {
      hover: alpha(
        defaults.dark ?
          defaults.white :
          defaults.black,
        opacity.hover
      )
    },
    autoContrast: (base, hex1 = defaults.black, hex2 = defaults.white) => (
      contrast(base, hex1) > contrast(base, hex2) ?
        hex1 :
        hex2
    ),
    alpha
  });
};
