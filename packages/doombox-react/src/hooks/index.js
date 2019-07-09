import React, { useState, useEffect } from 'react';

// Types
import {
  FETCH_USER,
  FETCH_USERS
} from '@doombox/utils/types/fetch';
import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '@doombox/utils/types/receive';

// Actions
import { fetchCachedUser, fetchUser } from '../actions/fetchActions';

const { ipcRenderer } = window.require('electron');

export const useSubscribeUser = query => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCachedUser()
      .then(username => fetchUser(username, query))
      .catch(() => fetchUser(null, query));
  }, []);

  useEffect(() => {
    ipcRenderer.on(RECEIVE_USER, (event, payload) => {
      if (payload.errors) setUser(payload.errors);
      setUser(payload.data.createUser || payload.data.user || {});
    });
  }, []);

  return user;
};
