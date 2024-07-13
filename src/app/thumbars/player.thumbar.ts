import type { BrowserWindow } from 'electron';

import createSend from '../lib/ipc/send';
import createThumbarButton from '../lib/thumbar/thumbarButton';

export type PlayerThumbarProps = {
  paused?: boolean
};

export default (window: BrowserWindow) => {
  const send = createSend(window.webContents);

  return (props?: PlayerThumbarProps) => window.setThumbarButtons([
    createThumbarButton({
      tooltip: 'Previous',
      icon: 'skip_previous',
      click: send('previous')
    }),
    createThumbarButton({
      tooltip: 'Play',
      hidden: !props?.paused,
      icon: 'play',
      click: send('play')
    }),
    createThumbarButton({
      tooltip: 'Pause',
      hidden: props?.paused,
      icon: 'pause',
      click: send('pause')
    }),
    createThumbarButton({
      tooltip: 'Next',
      icon: 'skip_next',
      click: send('next')
    }),
    createThumbarButton({
      tooltip: 'Shuffle',
      icon: 'shuffle',
      click: send('shuffle')
    })
  ]);
};
