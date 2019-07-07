import {
  FETCH_USER,
  FETCH_USERS
} from '../../../../utils/types/fetch';

const { ipcRenderer } = window.require('electron');

export const fetchUser = (username, query) => {
  ipcRenderer.send(FETCH_USER, query || `
    query {
      user(username: "${username || 'Kermit'}") {
        username
        avatar {
          path
        }
      }
    }
  `);
};

export const fetchUsers = query => {
  ipcRenderer.send(FETCH_USERS, query || `
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
