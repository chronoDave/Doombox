import type { Time } from '../../types/primitives';

export type TimeToHhMmSsOptions = {
  fullTime: boolean
};

export default (time: Time, options?: TimeToHhMmSsOptions) => {
  const pad = (n: number) => `${n}`.padStart(2, '0');

  return [
    options?.fullTime || time.h > 0 ? pad(time.h) : undefined,
    pad(time.m),
    pad(time.s)
  ].filter(x => x).join(':');
};
