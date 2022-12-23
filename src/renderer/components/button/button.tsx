import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import cx from '../../utils/cx';

import './button.scss';

export type ButtonProps = forgo.JSX.HTMLAttributes<HTMLButtonElement> & {
  onclick: forgo.JSX.MouseEventHandler<HTMLButtonElement>
  'aria-label'?: string
  variant: 'filled'
  class?: string
};

const Button: Component<ButtonProps> = () => {
  const component = new forgo.Component<ButtonProps>({
    render(props) {
      return (
        <button
          onclick={props.onclick}
          type="button"
          aria-label={props['aria-label']}
          class={cx(
            'Button',
            props.variant,
            props.class
          )}
        >
          {props.children}
        </button>
      );
    }
  });

  return component;
};

export default Button;
