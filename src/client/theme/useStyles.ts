import { css } from '@emotion/css';
import { capitalize } from '@doombox-utils';

import { useTheme, Theme } from '../providers/Theme.provider';

type Style = { [key: string]: string };

type Styles<T extends string> = (theme: Theme) => Record<T, Style>;

export default <T extends string>(styles: Styles<T>, label: string) => {
  const theme = useTheme();
  const styleEntries = Object.entries(styles(theme));
  const classes: Record<string, string> = {};

  for (let i = 0; i < styleEntries.length; i += 1) {
    const [key, value] = styleEntries[i];

    classes[key] = css({
      ...value as Style,
      label: `${label}${capitalize(key)}`
    });
  }

  return classes as Record<T, string>;
};
