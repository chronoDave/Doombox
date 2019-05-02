import {
  RECEIVE_DATABASE_CREATED
} from '../actionTypes/receiveTypes';
import {
  SET_DATABASE_UPDATED,
  SET_BACKGROUND_IMAGE
} from '../actionTypes/databaseTypes';

export const systemReducer = (
  state = {
    path: '',
    databaseUpdated: false,
    backgroundImage: ''
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_DATABASE_CREATED:
      return ({
        ...state,
        databaseUpdated: true
      });
    case SET_BACKGROUND_IMAGE:
      return ({
        ...state,
        backgroundImage: action.payload
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
