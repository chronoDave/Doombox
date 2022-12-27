import createSlice from '../../utils/createSlice';

export type AppView = 'album';

export type AppState = {
  ready: boolean,
  view: AppView,
};

export default (state: AppState) => createSlice({
  setReady: (ready: boolean) => {
    state.ready = ready;
  },
  setView: (view: AppView) => {
    state.view = view;
  }
}, 'app');
