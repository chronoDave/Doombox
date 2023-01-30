import appReducer from './reducers/app.reducer';
import libraryReducer from './reducers/library.reducer';
import themeReducer from './reducers/theme.reducer';
import userReducer from './reducers/user.reducer';
import viewReducer from './reducers/view.reducer';
import state from './state';
import createStore from './utils/createStore';

const store = createStore(state, {
  ...appReducer,
  ...viewReducer,
  ...libraryReducer,
  ...themeReducer,
  ...userReducer
});

export default store;
