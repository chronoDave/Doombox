import Window from '../../lib/window/window';
import createPlayerThumbar from '../../thumbars/player.thumbar';

export default class AppWindow extends Window {
  constructor(root: string) {
    super({
      id: 'app',
      title: 'Doombox',
      root
    });
  }

  async show() {
    await super.show();
    createPlayerThumbar(this._window)();
  }
}
