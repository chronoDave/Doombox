import type EventEmitter from '../../lib/eventEmitter';

import { IS_DEV } from '../../utils/const';

const createSlice = <T extends Record<string, Function>>(
  actions: T,
  name: string
) =>
  (emitter: EventEmitter<string>) =>
    Object.fromEntries(Object.entries(actions)
      .map(([key, fn]) => [
        key,
        async (...args: unknown[]) => {
          await fn(...args);

          const event = `${name}.${key}`;
          emitter.emit(event);
          if (IS_DEV) console.log(`[event.state]: ${event}`);
        }
      ])) as any as T;

export default createSlice;
