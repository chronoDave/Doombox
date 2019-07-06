import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const userReducer = (
  state = {
    username: null,
    avatar: null,
    isNew: false
  }, action
) => {
  switch (action.type) {
    case RECEIVE_USER:
      if (Object.keys(action.payload).length === 0) {
        return {
          ...state,
          isNew: true
        };
      }
      return {
        ...state,
        ...action.payload,
        isNew: false
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
