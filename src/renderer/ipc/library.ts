import { selectFolders } from './app';

export const addFolders = () => selectFolders()
  .then(window.ipc.library.addFolders);

export const getLibrary = () => window.ipc.library.get();
