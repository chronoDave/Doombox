import {
  RECEIVE_DATABASE_CREATED
} from '../actionTypes/receiveTypes';
import {
  SET_DATABASE_UPDATED
} from '../actionTypes/databaseTypes';

export const systemReducer = (
  state = {
    path: '',
    databaseUpdated: false
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_DATABASE_CREATED:
      return ({
        ...state,
        databaseUpdated: true
      });
    case SET_DATABASE_UPDATED:
      return ({
        ...state,
        databaseUpdated: action.payload
      });
    default:
      return state;
  }
};
