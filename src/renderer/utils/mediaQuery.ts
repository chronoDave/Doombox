import type { MediaQuery } from '../types/mediaQuery';

import { BREAKPOINTS } from './const';

export default (...params: MediaQuery[]) => params
  .map(param => `(${param.axis}: ${BREAKPOINTS[param.breakpoint]}px)`)
  .join(' and ');
