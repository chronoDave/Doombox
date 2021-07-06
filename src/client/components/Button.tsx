import React from 'react';

import { cx } from '../theme';

export interface ButtonProps {
  children: React.ReactNode
  title: string
  className?: string
}

export const Button = (props: ButtonProps) => {
  const {
    title,
    className,
    children,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type="button"
      className={cx('Button', className)}
      title={title}
    >
      {children}
    </button>
  );
};
