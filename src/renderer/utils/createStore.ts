import type { Component } from 'forgo';

import objGet from 'lodash.get';

import EventEmitter from '../../lib/eventEmitter';
import { IS_DEV } from '../../utils/const';

export type State = Record<string, unknown>;
export type Reducer<S extends State> = {
  channel: Extract<keyof S, string>
  action: (payload: any) => (state: S) => S
};

const createStore = <S extends State, R extends Record<string, Reducer<S>>>(
  initialState: S,
  reducers: R
) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __state = initialState;
  const emitter = new EventEmitter<Extract<keyof S, string>, S>();

  const get = () => __state;

  const dispatch = async <T extends keyof R>(key: T, payload: Parameters<R[T]['action']>[0]) => {
    const old = __state;
    const { channel, action } = reducers[key];
    const state = action(payload)(old);

    if (IS_DEV) {
      console.group(`[store.channel] ${channel}`);
      console.log('[state.old]', __state);
    }

    __state = state;

    if (IS_DEV) {
      console.log('[state.new]', __state);
      console.groupEnd();
    }

    emitter.emit(channel, old);
  };

  const subscribe = (component: Component, paths: string[]) => {
    const update = (state: S) => paths
      .some(channel => objGet(state, channel) !== objGet(__state, channel)) && component.update();

    const channels = paths.map(path => path.split('.')[0]) as Array<Extract<keyof S, string>>;
    component.mount(() => channels.forEach(channel => emitter.on(channel, update)));
    component.unmount(() => channels.forEach(channel => emitter.off(channel, update)));

    return component;
  };

  return ({ dispatch, subscribe, get });
};

export default createStore;
