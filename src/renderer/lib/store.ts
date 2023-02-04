import type { Component } from 'forgo';

import { IS_DEV } from '../../utils/const';

export default class Store<S extends Record<string, unknown>> {
  private readonly _listeners: Set<(prev: S, cur: S) => void>;
  private _state: S;

  constructor(state: S) {
    this._state = state;
    this._listeners = new Set();
  }

  get() {
    return this._state;
  }

  dispatch(reducer: (state: S) => S) {
    const prev = this._state;
    this._state = reducer(prev);

    if (IS_DEV) {
      console.group('[dispatch]');
      console.log('[state.old]', prev);
      console.log('[state.new]', this._state);
      console.groupEnd();
    }

    this._listeners.forEach(listener => listener(prev, this._state));
  }

  subscribe<T extends Component>(component: T, shouldUpdate: (prev: S, cur: S) => boolean) {
    const listener = (prev: S, cur: S) => shouldUpdate(prev, cur) && component.update();

    component.mount(() => this._listeners.add(listener));
    component.unmount(() => this._listeners.delete(listener));

    return component;
  }
}
