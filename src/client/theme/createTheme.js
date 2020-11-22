import url from 'url';

import { THEME } from '@doombox-config';

import transition from './transitions';
import typography from './typography';
import breakpoints from './breakpoints';
import mixins from './mixins';
import shadows from './shadows';

export default theme => {
  const toPx = (n = 1) => `${n * 8}px`;
  const hexToRgb = hex => {
    const int = parseInt(hex.slice(1), 16);
    // eslint-disable-next-line no-bitwise
    return `${(int >> 16) & 255},${(int >> 8) & 255},${int & 255}`;
  };

  return ({
    palette: {
      ...THEME,
      ...theme,
      fade: (hex, opacity) => `rgba(${hexToRgb(hex)},${opacity})`,
      hexToRgb
    },
    mixins,
    transition,
    typography,
    breakpoints,
    shadows,
    spacing: (...args) => (args.length === 0 ? toPx() : args.map(toPx).join(' ')),
    createImage: (src, opacity = 0.42) => [
      `linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity}))`,
      `url("${url.pathToFileURL(src).href}")`
    ].join(','),
    border: (color, width = 1, style = 'solid') => `${width}px ${style} ${color}`
  });
};
