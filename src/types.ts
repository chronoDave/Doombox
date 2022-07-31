export type Constrain<P, T extends { [K in string]: P }> = T;

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

export interface ElectronApi {

}
