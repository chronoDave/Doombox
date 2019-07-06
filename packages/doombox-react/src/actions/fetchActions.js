import {
  FETCH_USER,
  FETCH_USERS
} from '../../../../utils/types/fetch';

const { ipcRenderer } = window.require('electron');

export const fetchUser = () => {
  ipcRenderer.send(FETCH_USER);
};

export const fetchUsers = () => {
  ipcRenderer.send(FETCH_USERS, `
    query {
      users {
        username
        avatar {
          url
        }
      }
    }
  `);
};
