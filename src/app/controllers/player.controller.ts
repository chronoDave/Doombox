import type { IpcChannel, IpcSendController } from '../../types/ipc';
import type { BrowserWindow } from 'electron';

import createTaskbar from '../lib/taskbar';

export type PlayerControllerProps = {
  window: BrowserWindow
};

export default (props: PlayerControllerProps) => {
  const updateTaskbar = createTaskbar(props.window);
  updateTaskbar({ playing: false });

  return (): IpcSendController[IpcChannel.Player] => ({
    play: () => updateTaskbar({ playing: true }),
    pause: () => updateTaskbar({ playing: false })
  });
};
