import { IpcController } from '@doombox/ipc';

import Theme from './theme.storage';

const controller: IpcController<'THEME'> = {
  GET: () => Promise.resolve(Theme.get())
};

export default controller;
