export type Rect = { width: number, height: number };
export type Point = { x: number, y: number };

export type Json =
  string |
  number |
  boolean |
  null |
  Json[] |
  { [key: string]: Json };

export type Shape = { [key: string]: Json };
