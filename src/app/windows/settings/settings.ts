import type { WindowProps } from '../../lib/window/window';

import path from 'path';

import createWindow from '../../lib/window/window';

export type SettingsProps = {
  backgroundColor: string,
  size: WindowProps['size'],
  position: WindowProps['position'],
};

export default (props: SettingsProps) => createWindow({
  file: path.resolve(__dirname, 'renderer/settings/index.html'),
  preload: path.resolve(__dirname, 'preload/settings.js'),
  backgroundColor: props.backgroundColor,
  size: props.size,
  position: props.position
});
