import {
  TOGGLE_SONG_VIEW,
  CLOSE_SONG_VIEW,
  SET_ACTIVE_WINDOW
} from '../actionTypes/windowTypes';

export const toggleWindow = (index, id) => dispatch => {
  dispatch({
    type: TOGGLE_SONG_VIEW,
    payload: {
      index,
      id
    }
  });
};

export const closeWindow = () => dispatch => {
  dispatch({
    type: CLOSE_SONG_VIEW
  });
};

export const setActiveWindow = id => dispatch => {
  dispatch({
    type: SET_ACTIVE_WINDOW,
    payload: {
      id
    }
  });
};
