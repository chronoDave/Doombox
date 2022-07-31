import path from 'path';
import { BrowserWindow } from 'electron';

import type { Point, Rect } from '../../types';

export type BrowserWindowProps = {
  x?: number
  y?: number
  width: number
  height: number
  onResize: (rect: Rect) => void,
  onMove: (point: Point) => void
};

export default (props: BrowserWindowProps) => {
  const browserWindow = new BrowserWindow({
    title: 'Doombox',
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    minWidth: 320,
    minHeight: 240,
    // frame: process.platform === 'darwin',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  browserWindow.on('resize', () => {
    const { width, height } = browserWindow.getBounds();
    props.onResize({ width, height });
  });

  browserWindow.on('move', () => {
    const [x, y] = browserWindow.getPosition();
    props.onMove({ x, y });
  });

  browserWindow.loadFile('renderer/index.html');
};
