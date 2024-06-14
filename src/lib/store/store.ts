import { IS_DEV } from '../const';

export type State = Record<string, any>;

export type Subscriber<S extends State> = (prev: S, cur: S) => void;
export type Reducer<S extends State> = (state: S) => S;

export default class Store<S extends State> {
  private readonly _subscribers: Set<Subscriber<S>>;
  protected _state: S;

  constructor(state: S) {
    this._state = state;
    this._subscribers = new Set();

    Object.preventExtensions(this._state);
  }

  set(reducer: Reducer<S>, id: string) {
    const prev = this._state;

    if (IS_DEV) console.time(`[store] ${id}`);
    this._state = reducer(this._state);
    if (IS_DEV) console.timeEnd(`[store] ${id}`);

    this._subscribers.forEach(subscriber => subscriber(prev, this._state));

    return this._state;
  }

  on(subscriber: Subscriber<S>) {
    if (!this._subscribers.has(subscriber)) this._subscribers.add(subscriber);

    return this;
  }

  off(subscriber: Subscriber<S>) {
    this._subscribers.delete(subscriber);

    return this;
  }
}
