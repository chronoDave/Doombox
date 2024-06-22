import deepEqual from 'fast-deep-equal';

import Stack from '../stack/stack';

export type State = Record<string, any>;
export type Subscriber<S extends State> = (cur: S, prev: S) => void;
export type Reducer<S extends State, T> = (state: S) => T;
export type Action<T> = (slice: T) => void;

export default class Store<S extends State> {
  private readonly _subscribers: Set<Subscriber<S>>;

  protected _stack: Stack<S>;

  protected get _cur(): S {
    return this._stack.peek()!;
  }

  protected get _prev(): S {
    return this._stack.peek(-1)!;
  }

  constructor(state: S) {
    this._subscribers = new Set();
    this._stack = new Stack<S>(2).push(state);
  }

  update(next: (state: S) => S) {
    this._stack.push(next(this._cur));
    this._subscribers.forEach(subscriber => subscriber(this._cur, this._prev));

    return this;
  }

  select<T>(reducer: Reducer<S, T>) {
    return (action: Action<T>) => {
      this.subscribe((cur, prev) => {
        const [x, y] = [cur, prev].map(reducer);

        if (!deepEqual(x, y)) action(x);
      });

      action(reducer(this._cur));

      return this;
    };
  }

  subscribe(subscriber: Subscriber<S>) {
    if (!this._subscribers.has(subscriber)) this._subscribers.add(subscriber);

    return this;
  }

  unsubscribe(subscriber: Subscriber<S>) {
    this._subscribers.delete(subscriber);

    return this;
  }
}
