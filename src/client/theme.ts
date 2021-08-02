import { Theme } from '@doombox/theme';

import { ipcInvoke } from './ipc/ipc';
import { hexToRgb } from './utils';

export default class {
  private static get(key: string) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(key);
  }

  private static set(key: string, value: string) {
    document.documentElement.style.setProperty(key, value);
  }

  static fetch() {
    ipcInvoke<'THEME', Theme>('THEME', 'GET')
      .then(({ data }) => {
        this.set('--type', data.type);
        this.set('--primary-main', hexToRgb(data.palette.primary.main));
        this.set('--primary-text', hexToRgb(data.palette.primary.text));
        this.set('--error-main', hexToRgb(data.palette.error.main));
        this.set('--error-text', hexToRgb(data.palette.error.text));
        this.set('--black', hexToRgb(data.palette.black));
        this.set('--white', hexToRgb(data.palette.white));
        this.set('--grey-100', hexToRgb(data.palette.grey[100]));
        this.set('--grey-200', hexToRgb(data.palette.grey[200]));
        this.set('--grey-300', hexToRgb(data.palette.grey[300]));
      });
  }

  static get dark() {
    const type = this.get('--type');
    if (!type) return true;
    return type === 'dark';
  }

  static set dark(value: boolean) {
    this.set('--type', value ? 'dark' : 'light');
  }
}
