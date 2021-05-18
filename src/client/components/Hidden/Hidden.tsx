import os from 'os';

import React, { Children, cloneElement } from 'react';
import { cx } from '@doombox-utils';

import { Breakpoint } from '../../theme/breakpoints';

import useMediaQuery from '../../hooks/useMediaQuery';

import './Hidden.scss';

export interface HiddenProps {
  children: React.ReactElement,
  on?: {
    query: Breakpoint.Queries,
    value: Breakpoint.Keys
  },
  platform?: 'Darwin'
}

export const Hidden = ({ children, on, platform }: HiddenProps) => {
  const isMatch = useMediaQuery(on?.query, on?.value);

  return (
    Children.only(children) && cloneElement(children, {
      className: cx(
        children.props.className,
        (isMatch || platform === os.type()) && 'Hidden'
      )
    })
  );
};
