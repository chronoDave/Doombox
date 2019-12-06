import React, {
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { TYPE } from '@doombox/utils';

// Utils
import { IpcContext } from '../../utils/context';

const { ipcRenderer } = window.require('electron');

const IpcProvider = ({ children }) => {
  const [action, setAction] = useState(null);

  useEffect(() => {
    ipcRenderer.on(TYPE.IPC.KEYBIND, (event, payload) => setAction(payload));

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  return (
    <IpcContext.Keybind.Provider value={action}>
      {children}
    </IpcContext.Keybind.Provider>
  );
};

IpcProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default IpcProvider;
