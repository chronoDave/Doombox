import { theme } from '@doombox/config';

import { hexToRgb } from './utils';

type ThemeValue = {
  '--dark': boolean
  '--grey-100': string
  '--grey-200': string
  '--grey-300': string
  '--black': string
  '--white': string
  '--primary-main': string
  '--primary-text': string
  '--error-main': string
  '--error-text': string
};

export default class Theme {
  static get(key: keyof ThemeValue) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(key);
  }

  static set<T extends keyof ThemeValue>(key: T, value: ThemeValue[T]) {
    document.documentElement.style.setProperty(key, `${value}`);
  }

  static initialize() {
    this.set('--dark', theme.dark);
    this.set('--grey-100', hexToRgb(theme.palette.grey[100]));
    this.set('--grey-200', hexToRgb(theme.palette.grey[200]));
    this.set('--grey-300', hexToRgb(theme.palette.grey[300]));
    this.set('--primary-main', hexToRgb(theme.palette.primary.main));
    this.set('--primary-text', hexToRgb(theme.palette.primary.text));
    this.set('--error-main', hexToRgb(theme.palette.error.main));
    this.set('--error-text', hexToRgb(theme.palette.error.text));
  }
}
