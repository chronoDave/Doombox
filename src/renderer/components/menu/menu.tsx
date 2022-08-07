import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { IconProps } from '../icon/icon';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './Menu.scss';

export type MenuProps = {
  id: string
  onclose: () => void
  items: Array<{
    icon?: IconProps['id']
    label: string
    onclick: (event: forgo.JSX.TargetedMouseEvent<HTMLButtonElement>) => void
  }>
};

const Menu: Component<MenuProps> = () => new forgo.Component({
  render(props) {
    return (
      <ul
        id={`menu-${props.id}`}
        role='menu'
        aria-labelledby={`menu-button-${props.id}`}
        class='Menu'
      >
        {props.items.map(item => (
          <li class='MenuItem' role='none' key={item.label}>
            <button
              type='button'
              role='menuitem'
              onclick={event => {
                item.onclick(event);
                props.onclose();
              }}
            >
              {item.icon && <Icon id={item.icon} />}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
});

export default Menu;
