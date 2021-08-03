import Inferno from 'inferno';

import { cx } from '../utils';

export interface ButtonProps {
  children: Inferno.InfernoChild
  title: string
  onClick: Inferno.MouseEventHandler<HTMLButtonElement>,
  className?: string
}

export default (props: ButtonProps) => {
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
      $HasVNodeChildren
    >
      {children}
    </button>
  );
};
