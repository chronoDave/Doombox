import type Logger from '../../lib/logger/logger';

import path from 'path';

import Window from '../../lib/window/window';

export type SettingsWindowProps = {
  logger: Logger
  root: string
};

export default class SettingsWindow extends Window {
  constructor(props: SettingsWindowProps) {
    super({
      logger: props.logger,
      cache: {
        root: props.root,
        name: 'settings'
      },
      title: 'Settings - Doombox',
      file: {
        html: path.resolve(__dirname, 'renderer/settings/index.html'),
        preload: path.resolve(__dirname, 'preload/settings.js')
      }
    });
  }
}
