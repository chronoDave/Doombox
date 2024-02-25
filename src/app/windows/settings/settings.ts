import type { WindowProps } from '../../lib/window/window';
import type { BrowserWindow } from 'electron';

import path from 'path';

import createWindow from '../../lib/window/window';

export type SettingsProps = {
  parent: BrowserWindow
  backgroundColor: string,
  size: WindowProps['size'],
  position: WindowProps['position'],
};

export default (props: SettingsProps) => createWindow({
  file: path.resolve(__dirname, 'renderer/settings.html'),
  preload: path.resolve(__dirname, 'preload/settings.js'),
  backgroundColor: props.backgroundColor,
  size: props.size,
  position: props.position,
  parent: props.parent
});
