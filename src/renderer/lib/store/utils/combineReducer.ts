import type { Action, Reducer, State } from '../types';

const combineReducers = <S extends State>(channel: Extract<keyof S, string>) =>
  <R extends Record<string, Action<S>>>(reducers: R): Record<keyof R, Reducer<S>> => {
    const entries: Array<[keyof R, Reducer<S>]> = Object.entries(reducers)
      .map(([key, action]) => [key, { channel, action }]);

    return Object.fromEntries(entries) as Record<keyof R, Reducer<S>>;
  };

export default combineReducers;
