import type { Doc } from 'leaf-db';

export type Json =
  string |
  number |
  boolean |
  null |
  Json[] |
  { [key: string]: Json };

export type Shape = { [key: string]: Json };

export type Collection<T extends Doc<{}>> = {
  set: Set<T>
  map: Map<string, T>
};
