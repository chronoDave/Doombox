import {
  RECEIVE_USERS
} from '@doombox/utils/types/receive';

export const systemReducer = (
  state = {}, action
) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state
      };
    default:
      return state;
  }
};
