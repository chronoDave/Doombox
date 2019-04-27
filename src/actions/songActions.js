import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
  SET_SONG,
  DECREASE_VOLUME,
  INCREASE_VOLUME,
  TOGGLE_STATUS
} from '../actionTypes/songTypes';

export const setVolume = volume => dispatch => {
  dispatch({
    type: SET_VOLUME,
    payload: volume
  });
};

export const decreaseVolume = () => dispatch => {
  dispatch({
    type: DECREASE_VOLUME
  });
};

export const increaseVolume = () => dispatch => {
  dispatch({
    type: INCREASE_VOLUME
  });
};

export const toggleStatus = () => dispatch => {
  dispatch({
    type: TOGGLE_STATUS
  });
};

export const setPosition = position => dispatch => {
  dispatch({
    type: SET_POSITION,
    payload: position
  });
};

export const setStatus = status => dispatch => {
  dispatch({
    type: SET_STATUS,
    payload: status
  });
};

export const setSong = song => dispatch => {
  dispatch({
    type: SET_SONG,
    payload: song
  });
};
