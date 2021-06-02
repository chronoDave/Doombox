import { css } from '@emotion/css';

import { useTheme } from './useContext';
import { Theme } from '../theme';

export type Style = string | number | { [key: string]: Style };
export type Styles = Record<string, Record<string, Style>>;

export default <T extends Styles>(label: string, createStyles: (theme: Theme) => T) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return Object.entries(styles)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: css(value, { label })
    }), {}) as Record<keyof T, string>;
};
