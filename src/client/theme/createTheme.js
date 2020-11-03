import url from 'url';

import { THEME } from '@doombox-config';
import merge from 'deepmerge';

import transition from './transitions';
import typography from './typography';
import breakpoints from './breakpoints';
import shadows from './shadows';

const toPx = (n = 1) => `${n * 8}px`;
const hexToRgb = hex => {
  const int = parseInt(hex.slice(1), 16);
  return [
    (int >> 16) & 255,
    (int >> 8) & 255,
    int & 255
  ].join(',');
};

export default theme => {
  const palette = merge(theme, THEME);

  return ({
    palette: {
      ...palette,
      fade: (hex, opacity) => `rgba(${hexToRgb(hex)},${opacity})`,
      hexToRgb
    },
    transition,
    typography,
    breakpoints,
    shadows,
    spacing: (...args) => (args.length === 0 ? toPx() : args.map(toPx).join(' ')),
    createImage: (src, opacity = palette.action.inactive) => [
      `linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity}))`,
      `url("${url.pathToFileURL(src).href}")`
    ].join(','),
    border: (color, width = 1, style = 'solid') => `${width}px ${style} ${color}`
  });
};
