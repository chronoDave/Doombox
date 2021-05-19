import { ValueOf } from '../../types';

export type Queries = 'min-width' | 'min-height' | 'max-width' | 'max-height';
export type Keys = keyof typeof values;
export type Values = ValueOf<typeof values>;

const values = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 960,
  xl: 1280
} as const;

const createQuery = (query: Queries, value: Values) => `(${query}: ${value - (query.includes('max') ? 1 : 0)}px)`;

export default {
  values,
  on: (query: Queries, key: Keys) => `@media ${createQuery(query, values[key])}`,
  match: (query: Queries, key: Keys) => window
    .matchMedia(createQuery(query, values[key]))
    .matches
};
