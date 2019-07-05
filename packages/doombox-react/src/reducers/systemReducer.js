import { FETCHING } from '../types/fetch';
import {
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const systemReducer = (
  state = {
    fetching: false
  }, action
) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        fetching: true
      };
    case RECEIVE_USERS:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
};
