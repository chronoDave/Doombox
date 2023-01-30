export type State = Record<string, unknown>;

export type Action<S extends State, P = any> = (payload: P) => (state: S) => S;

export type Channel<S extends State> = Extract<keyof S, string>;

export type Reducer<S extends State, P = any> = {
  channel: Channel<S>
  action: Action<S, P>
};
