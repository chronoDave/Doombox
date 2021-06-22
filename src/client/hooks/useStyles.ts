import { css } from '@emotion/css';
import { Theme } from '@doombox-theme';

import { useTheme } from './useContext';

export type Style = string | number | { [key: string]: Style };
export type Styles = Record<string, Record<string, Style>>;

export default <T extends Styles>(label: string, styles: T | ((theme: Theme) => T)) => {
  const theme = useTheme();

  return Object.entries(typeof styles === 'function' ? styles(theme) : styles)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: css(value, { label })
    }), {}) as Record<keyof T, string>;
};
