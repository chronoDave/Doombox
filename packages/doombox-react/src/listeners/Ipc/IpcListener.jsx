import {
  useMemo,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMANDS_CRUD,
  TYPES_IPC
} from '../../../../doombox-utils/const';

const { ipcRenderer } = window.require('electron');

const IpcListener = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(TYPES_IPC.LIBRARY, (event, payload) => dispatch(payload));
  }, []);

  return useMemo(() => children, []);
};

export default IpcListener;
