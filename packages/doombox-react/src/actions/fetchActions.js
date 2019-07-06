import {
  FETCH_USER,
  FETCH_USERS
} from '../../../../utils/types/fetch';
import { FETCHING } from '../types/fetch';

const { ipcRenderer } = window.require('electron');

export const fetchUser = () => dispatch => {
  dispatch({ type: FETCHING });
  ipcRenderer.send(FETCH_USER);
};

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING });

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
