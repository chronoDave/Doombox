import { css, cx } from '@emotion/css';
import { Children, cloneElement } from 'react';

import { breakpoints } from '../../theme';
import { Query, Key } from '../../theme/breakpoints';

export interface HiddenProps {
  children: React.ReactElement,
  on?: [Query, Key],
  platform?: NodeJS.Platform
}

export const Hidden = ({ children, on, platform }: HiddenProps) => (
  Children.only(children) && cloneElement(children, {
    className: cx(
      children.props.className,
      on && css({
        [breakpoints.on(...on)]: { display: 'none' },
        label: 'Hidden'
      }),
      platform === process.platform && css({
        display: 'none',
        label: 'Hidden'
      }),
    )
  })
);
