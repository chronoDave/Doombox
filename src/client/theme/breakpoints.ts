import { ValueOf } from '@doombox-types';

export namespace Breakpoint {
  export type Keys = keyof typeof breakpoints;
  export type Values = ValueOf<typeof breakpoints>;
  export type Queries = 'min-width' | 'min-height' | 'max-width' | 'max-height';
}

export const breakpoints = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 960,
  xl: 1280
} as const;

export const getMediaQuery = (
  query: Breakpoint.Queries,
  key: Breakpoint.Keys
) => window
  .matchMedia(`(${query}: ${breakpoints[key] - (query.includes('max') ? 1 : 0)}px)`)
  .matches;
