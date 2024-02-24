import type { Time } from '../../types/primitives';

export default (n: number): Time => ({
  s: Math.floor(n % 60),
  m: Math.floor(n / 60) % 60,
  h: Math.floor(n / 3600)
});
