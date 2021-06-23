type ThemeKey =
  '--dark' |
  '--black' |
  '--white' |
  '--primary-main' |
  '--primary-text';

export const getTheme = (key: ThemeKey) => getComputedStyle(document.documentElement)
  .getPropertyValue(key);
export const setTheme = (key: ThemeKey, value: string) => document.documentElement.style
  .setProperty(key, value);
