import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '../../../../utils/types/receive';

export const receiveUsers = payload => dispatch => {
  dispatch({ type: RECEIVE_USERS, payload });
};

export const receiveUser = payload => dispatch => {
  dispatch({ type: RECEIVE_USER, payload });
};
