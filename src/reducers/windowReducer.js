import {
  VIEW_ALBUM,
  SET_VIEW
} from '../actionTypes/windowTypes';

export const windowReducer = (
  state = {
    view: VIEW_ALBUM,
  },
  action
) => {
  switch (action.type) {
    case SET_VIEW: {
      return {
        ...state,
        view: action.payload.view
      };
    }
    default:
      return state;
  }
};
