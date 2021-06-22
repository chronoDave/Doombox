import { ValueOf } from '@doombox-types';

export type Query = 'min-width' | 'min-height' | 'max-width' | 'max-height';
export type Key = keyof typeof values;
export type Value = ValueOf<typeof values>;

export const values = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 960,
  xl: 1280
} as const;

const createQuery = (query: Query, value: Value) => `(${query}: ${value - (query.includes('max') ? 1 : 0)}px)`;

export const on = (query: Query, key: Key) => `@media ${createQuery(query, values[key])}`;
export const match = (query: Query, key: Key) => window
  .matchMedia(createQuery(query, values[key]))
  .matches;
