import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const userReducer = (
  state = {}, action
) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        ...action.payload
      };
    // Temp
    case RECEIVE_USERS:
      return state;
    default:
      return state;
  }
};
