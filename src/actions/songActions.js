import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
} from '../actionTypes/songTypes';

export const setVolume = volume => dispatch => {
  dispatch({
    type: SET_VOLUME,
    payload: volume
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
