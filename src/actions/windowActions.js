import {
  SET_VIEW,
  TOGGLE_DRAWER
} from '../actionTypes/windowTypes';

export const setView = view => dispatch => {
  dispatch({
    type: SET_VIEW,
    payload: view
  });
};

export const toggleDrawer = id => dispatch => {
  dispatch({
    type: TOGGLE_DRAWER,
    payload: id
  });
};
