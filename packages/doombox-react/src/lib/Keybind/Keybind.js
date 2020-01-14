import EventEmitter from 'events';
import { TYPE } from '@doombox/utils';

const { ipcRenderer } = window.require('electron');

class Keybind extends EventEmitter {
  constructor() {
    super();

    ipcRenderer.on(TYPE.IPC.KEYBIND, (event, payload) => {
      console.log(payload);
      this.emit(payload.action);
    });
  }
}

export default Keybind;
