import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import cx from '../../utils/cx';

import './button.scss';

export type ButtonProps = forgo.JSX.HTMLAttributes<HTMLButtonElement> & {
  class?: string
};

const Button: Component<ButtonProps> = () => {
  const component = new forgo.Component<ButtonProps>({
    render(props) {
      return (
        <button
          {...props}
          type="button"
          class={cx('Button', props.class)}
        >
          {props.children}
        </button>
      );
    }
  });

  return component;
};

export default Button;
