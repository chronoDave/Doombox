import { ERROR } from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR.SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

const actions = {
  setError: error => ({
    type: ERROR.SET_ERROR,
    payload: error
  })
};

export const errorSlice = {
  name: 'error',
  reducer,
  actions
};
