import store from '../store/store';

export const fetchUser = async () => {
  const user = await window.ipc.user.all();

  store.dispatch('setUser', user);
};

export const setFolders = async (folders: string[]) => {
  const user = await window.ipc.user.set({
    key: 'library',
    value: { folders }
  });

  store.dispatch('setUser', user);
};
