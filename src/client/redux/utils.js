/**
 * Create Redux slice
 * @param {string} name - Reducer name
 * @param {object} initialState
 * @param {object[]} reducers - Array of reducers
 */
export const createReduxSlice = (name, initialState, reducers) => {
  const reducer = (state = initialState, action) => {
    if (!reducers[action.type]) return state;
    return reducers[action.type](state, action.payload);
  };

  const actions = Object
    .keys(reducers)
    .reduce((acc, key) => ({
      ...acc,
      [key]: payload => ({ type: key, payload })
    }), {});

  return ({ name, reducer, actions });
};
