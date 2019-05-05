import {
  VIEW_LABEL,
  SET_VIEW,
  TOGGLE_DRAWER
} from '../actionTypes/windowTypes';

export const windowReducer = (
  state = {
    view: VIEW_LABEL,
    drawer: false,
    id: 0,
    albumIndex: 0
  },
  action
) => {
  switch (action.type) {
    case SET_VIEW: {
      return {
        ...state,
        view: action.payload
      };
    }
    case TOGGLE_DRAWER: {
      return {
        ...state,
        drawer: !state.drawer,
        id: action.payload.id,
        albumIndex: action.payload.albumIndex
      };
    }
    default:
      return state;
  }
};
