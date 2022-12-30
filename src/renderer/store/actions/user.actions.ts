import store from '../store';

export const fetchUser = async () => {
  const user = await window.ipc.user.all();

  console.log(user);

  store.dispatch('setUser', user);
};

export const setFolders = async (folders: string[]) => {
  const user = await window.ipc.user.set({
    key: 'library',
    value: { folders }
  });

  store.dispatch('setUser', user);
};
