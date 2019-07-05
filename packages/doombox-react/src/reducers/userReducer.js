import {
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const userReducer = (
  state = {
    username: null,
    avatar: null
  }, action
) => {
  switch (action.type) {
    // For testing purposes only
    case RECEIVE_USERS:
      console.log(action.payload);
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};
