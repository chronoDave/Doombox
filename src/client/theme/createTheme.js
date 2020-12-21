import transitions from './transitions';
import typography from './typography';
import breakpoints from './breakpoints';
import mixins from './mixins';
import shadows from './shadows';
import utilities from './utilities';
import zIndex from './zIndex';
import createPalette from './createPalette';

export default palette => ({
  palette: createPalette(palette),
  mixins,
  transitions,
  typography,
  breakpoints,
  shadows,
  zIndex,
  ...utilities
});
