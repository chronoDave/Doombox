import type { Time } from '../../types/primitives';

export default (time: Time) => [
  time.h > 0 ? `${time.h}h` : undefined,
  `${time.m}m`,
  `${time.s}s`
].filter(x => x).join(' ');
