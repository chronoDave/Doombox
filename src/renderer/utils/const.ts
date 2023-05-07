import type { Breakpoint } from '../types/mediaQuery';

export const BREAKPOINTS: Record<Breakpoint, number> = {
  'xs-w': 320,
  'sm-w': 480,
  'md-w': 720,
  'lg-w': 960,
  'xl-w': 1280,
  'xs-h': 240,
  'sm-h': 320,
  'md-h': 480,
  'lg-h': 720,
  'xl-h': 960
} as const;
