import transitions from './transitions';
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
  breakpoints,
  shadows,
  zIndex,
  ...utilities
});
