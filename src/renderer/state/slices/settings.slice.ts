import createSlice from '../../utils/createSlice';

export type SettingsView = 'general';

export type SettingsState = {
  open: boolean
  view: SettingsView
};

export default (state: SettingsState) => createSlice({
  setOpen: (open: boolean) => {
    state.open = open;
  },
  setView: (view: SettingsView) => {
    state.view = view;
  }
}, 'settings');
