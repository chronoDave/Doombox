import {
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const receiveUsers = payload => dispatch => {
  dispatch({ type: RECEIVE_USERS, payload });
};
