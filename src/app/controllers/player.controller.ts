import type { ReceiveController } from '@doombox/types/ipc';

import createPlayerThumbar from '../thumbars/player.thumbar';

const playerController: ReceiveController['player'] = {
  play: (_, window) => window && createPlayerThumbar(window)({ paused: false }),
  pause: (_, window) => window && createPlayerThumbar(window)({ paused: true })
};

export default playerController;
