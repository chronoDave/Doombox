import {
  TOGGLE_SONG_VIEW,
  CLOSE_SONG_VIEW,
  SET_ACTIVE_WINDOW
} from '../actionTypes/windowTypes';

export const windowReducer = (
  state = {
    selected: 0,
    id: 0,
    menuVisible: false
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_SONG_VIEW: {
      return {
        ...state,
        id: action.payload.id,
        selected: action.payload.index,
        menuVisible: !state.menuVisible
      };
    }
    case CLOSE_SONG_VIEW: {
      return {
        ...state,
        menuVisible: false
      };
    }
    case SET_ACTIVE_WINDOW: {
      return {
        ...state,
        id: action.payload.id
      };
    }
    default:
      return state;
  }
};
