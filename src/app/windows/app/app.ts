import type { WindowProps } from '../../lib/window/window';

import path from 'path';

import createWindow from '../../lib/window/window';

export type HomeProps = {
  path: { thumbs: string },
  backgroundColor: string,
  size: WindowProps['size'],
  position: WindowProps['position']
};

export default (props: HomeProps) => createWindow({
  file: path.resolve(__dirname, 'renderer/app/index.html'),
  preload: {
    url: path.resolve(__dirname, 'preload/app.js'),
    data: { thumbs: props.path.thumbs }
  },
  backgroundColor: props.backgroundColor,
  size: props.size,
  position: props.position
});
