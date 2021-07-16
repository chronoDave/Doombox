import React from 'react';

import { cx } from '../theme';

export interface ButtonProps {
  children: React.ReactNode
  title: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className?: string
}

export const Button = (props: ButtonProps) => {
  const {
    onClick,
    title,
    className,
    children,
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx('Button', className)}
      title={title}
    >
      {children}
    </button>
  );
};
