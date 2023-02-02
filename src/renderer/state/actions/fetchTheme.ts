import produce from 'immer';

import store from '../store';

const fetchTheme = async () => {
  const theme = await window.ipc.theme.all();
  store.dispatch(produce(draft => {
    draft.theme = theme;
  }));
};

export default fetchTheme;
