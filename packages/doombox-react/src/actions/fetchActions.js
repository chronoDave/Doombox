import {
  FETCH_USER,
  FETCH_USERS,
  FETCH_CACHED_USER
} from '../../../../utils/types/fetch';
import {
  RECEIVE_CACHED_USER,
  RECEIVE_USER,
  RECEIVE_USERS
} from '../../../../utils/types/receive';

const { ipcRenderer } = window.require('electron');

export const fetchUser = async (username, query) => {
  ipcRenderer.send(FETCH_USER, query || `
    query getUser {
      user(username: ${JSON.stringify(username || '')}) {
        username
        avatar { path }
      }
    }
  `);
};

export const fetchUsers = query => {
  ipcRenderer.send(FETCH_USERS, query || `
    query getUsers {
      users {
        username
        avatar { url }
      }
    }
  `);
};

export const fetchCachedUser = async () => {
  ipcRenderer.send(FETCH_CACHED_USER);

  return new Promise((resolve, reject) => {
    ipcRenderer.on(RECEIVE_CACHED_USER, (event, payload) => {
      if (payload.errors) reject(payload.errors);
      resolve(payload.username);
    });
  });
};
