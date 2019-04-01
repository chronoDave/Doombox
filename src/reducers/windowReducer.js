import {
  VIEW_ALBUM,
  SET_VIEW,
  TOGGLE_DRAWER
} from '../actionTypes/windowTypes';

export const windowReducer = (
  state = {
    view: VIEW_ALBUM,
    drawer: false,
    id: 0
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
    case TOGGLE_DRAWER: {
      return {
        ...state,
        drawer: !state.drawer,
        id: action.payload
      };
    }
    default:
      return state;
  }
};
