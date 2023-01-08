export type State = Record<string, unknown>;

export type Action<S extends State> = (payload: any) => (state: S) => S;

export type Reducer<S extends State> = {
  channel: Extract<keyof S, string>
  action: Action<S>
};
