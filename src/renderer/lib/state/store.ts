import type { NestedKeyOf } from '../../../types/helpers';
import type { Channel, State, Reducer } from './types';
import type { Component } from 'forgo';

import get from 'lodash.get';

import { IS_DEV } from '../../../utils/const';
import Emitter from '../emitter/emitter';

type Slice<S extends State> = Record<string, Reducer<S>>;
type Payload<
  S extends State,
  R extends Slice<S>,
  T extends keyof R
> = Parameters<R[T]['action']>[0];

export default class Store<S extends State, R extends Slice<S>> extends Emitter<Channel<S>, S> {
  private _state: S;
  private readonly _slice: R;

  constructor(state: S, slice: R) {
    super();

    this._state = state;
    this._slice = slice;
  }

  get() {
    return this._state;
  }

  dispatch<T extends keyof R>(key: T, payload: Payload<S, R, T>) {
    const { channel, action } = this._slice[key];
    const old = this._state;

    if (IS_DEV) {
      console.group(`[store.channel] ${channel}`);
      console.log('[store.event]', { action: key, payload });
      console.log('[state.old]', old);
    }

    this._state = action(payload)(this._state);

    if (IS_DEV) {
      console.log('[state.new]', this._state);
      console.groupEnd();
    }

    this.emit(channel, old);
  }

  subscribe<T extends NestedKeyOf<S>>(component: Component, paths: T[]) {
    const update = (old: S) => {
      const shouldUpdate = paths
        .some(channel => get(old, channel) !== get(this._state, channel));

      if (shouldUpdate) component.update();
    };

    const channels = paths.map(path => path.split('.')[0]) as Array<Extract<keyof S, string>>;
    component.mount(() => channels.forEach(channel => this.on(channel, update)));
    component.unmount(() => channels.forEach(channel => this.off(channel, update)));

    return component;
  }
}
