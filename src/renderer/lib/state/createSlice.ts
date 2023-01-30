import type {
  Channel,
  Action,
  Reducer,
  State
} from './types';

type Actions<S extends State> = Record<string, Action<S>>;
type Payload<S extends State, A extends Actions<S>> = Parameters<A[keyof A]>[0];
type Slice<
  S extends State,
  A extends Actions<S>,
  P extends Payload<S, A>
> = Record<keyof A, Reducer<S, P>>;

const createSlice = <S extends State>(channel: Channel<S>) =>
  <A extends Actions<S>, P extends Payload<S, A>>(reducers: A): Slice<S, A, P> => {
    const entries: Array<[keyof A, Reducer<S, P>]> = Object.entries(reducers)
      .map(([key, action]) => [key, { channel, action }]);

    return Object.fromEntries(entries) as Slice<S, A, P>;
  };

export default createSlice;
