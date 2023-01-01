import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { IconProps } from '../icon/icon';

import * as forgo from 'forgo';

import cx from '../../utils/cx';
import Icon from '../icon/icon';

import './button.icon.scss';

export type ButtonIconProps = forgo.JSX.HTMLAttributes<HTMLButtonElement> & {
  class?: string
  ['aria-label']: string
  icon: IconProps['id']
};

const ButtonIcon: Component<ButtonIconProps> = () => {
  const component = new forgo.Component<ButtonIconProps>({
    render(props) {
      return (
        <button
          {...props}
          type="button"
          aria-label={props['aria-label']}
          class={cx('ButtonIcon', props.class)}
        >
          <Icon id={props.icon} />
        </button>
      );
    }
  });

  return component;
};

export default ButtonIcon;
