import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const userReducer = (
  state = {
    username: null,
    avatar: null
  }, action
) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        ...action.payload
      };
    // For testing purposes only
    case RECEIVE_USERS:
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};
