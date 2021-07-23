import { Theme } from '@doombox/theme';

import { hexToRgb } from './utils';
import { ipcInvoke } from './ipc/ipc';

type Palette =
  '--primary-main' |
  '--primary-text' |
  '--error-main' |
  '--error-text' |
  '--black' |
  '--white' |
  '--grey-100' |
  '--grey-200' |
  '--grey-300';

export default new class {
  constructor() {
    ipcInvoke<Theme>('THEME', 'GET')
      .then(({ data }) => this.update(data));
  }

  private get(key: string) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(key);
  }

  private set(key: string, value: string) {
    document.documentElement.style.setProperty(key, value);
  }

  private setPalette(key: Palette, hex: string) {
    this.set(key, hexToRgb(hex));
  }

  private update(theme: Theme) {
    this.set('--type', theme.type);
    this.setPalette('--primary-main', theme.palette.primary.main);
    this.setPalette('--primary-text', theme.palette.primary.text);
    this.setPalette('--error-main', theme.palette.error.main);
    this.setPalette('--error-text', theme.palette.error.text);
    this.setPalette('--black', theme.palette.black);
    this.setPalette('--white', theme.palette.white);
    this.setPalette('--grey-100', theme.palette.grey[100]);
    this.setPalette('--grey-200', theme.palette.grey[200]);
    this.setPalette('--grey-300', theme.palette.grey[300]);
  }

  get dark() {
    const type = this.get('--type');
    if (!type) return true;
    return type === 'dark';
  }

  set dark(value: boolean) {
    this.set('--type', value ? 'dark' : 'light');
  }
}();
