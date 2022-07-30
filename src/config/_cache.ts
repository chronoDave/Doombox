import { Shape } from '../types';

export interface Cache extends Shape {
  window: {
    width: number
    height: number
  }
  player: {
    muted: boolean
    volume: number
  }
  tabs: {
    search: string
  }
}

const cache: Cache = {
  window: {
    width: 320,
    height: 240
  },
  player: {
    muted: false,
    volume: 1
  },
  tabs: {
    search: 'song'
  }
} as const;

export default cache;
