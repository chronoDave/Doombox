export const createReduxSlice = <
  T extends string,
  S extends object,
  R extends Record<string, (state: S, payload: unknown) => void>
>(name: T, initialState: S, reducers: R) => {
  const reducer = (state = initialState, action: { type: string, payload: unknown }) => {
    if (!reducers[action.type]) return state;
    return reducers[action.type](state, action.payload);
  };

  const actions = Object
    .keys(reducers)
    .reduce((acc, key) => ({
      ...acc,
      [key]: (payload: unknown) => ({ type: key, payload })
    }), {}) as Record<keyof R, (payload: unknown) => { type: keyof R, payload: unknown }>;

  return {
    name,
    initialState,
    reducer,
    actions
  };
};
