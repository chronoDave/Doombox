import {
  SET_VIEW
} from '../actionTypes/windowTypes';

export const setView = view => dispatch => {
  dispatch({
    type: SET_VIEW,
    payload: view
  });
};
