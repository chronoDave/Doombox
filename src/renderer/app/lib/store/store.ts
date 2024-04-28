import { IS_DEV } from '../../../../lib/const';

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

  dispatch(reducer: (state: S) => S, action: string) {
    const prev = this._state;
    this._state = reducer(prev);

    if (IS_DEV) {
      console.group(`[dispatch] ${action}`);
      console.log('[state.old]', prev);
      console.log('[state.new]', this._state);
      console.groupEnd();
    }

    this._listeners.forEach(listener => listener(prev, this._state));

    return this._state;
  }

  subscribe(listener: (prev: S, cur: S) => void) {
    if (!this._listeners.has(listener)) this._listeners.add(listener);
  }

  unsubscribe(listener: (prev: S, cur: S) => void) {
    this._listeners.delete(listener);
  }
}
