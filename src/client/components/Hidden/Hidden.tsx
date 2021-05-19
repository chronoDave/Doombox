import { css, cx } from '@emotion/css';
import { Children, cloneElement } from 'react';

import { theme } from '../../theme';
import { Queries, Keys } from '../../theme/breakpoints';

export interface HiddenProps {
  children: React.ReactElement,
  on?: [Queries, Keys],
  platform?: NodeJS.Platform
}

export const Hidden = ({ children, on, platform }: HiddenProps) => (
  Children.only(children) && cloneElement(children, {
    className: cx(
      children.props.className,
      on && css({ [theme.breakpoints.on(...on)]: { display: 'none' } }),
      platform === process.platform && css({ display: 'none' })
    )
  })
);
