import type { IconProps } from '../icon/icon';
import type { PopupProps } from '../popup/popup';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import createClickAwayListener from '../../lib/dom/clickAwayListener/clickAwayListener';
import Icon from '../icon/icon';
import { createPopup } from '../popup/popup';

import './menu.scss';

export type MenuItemProps = {
  icon?: IconProps['id']
  label: string
  onclick: (event: MouseEvent) => void
  disableAutoclose?: boolean
};

export type MenuProps = {
  id: string
  items: MenuItemProps[]
  popup: Omit<PopupProps, 'anchor'>
  onopen?: (event: MouseEvent) => void
  onclose?: (event: MouseEvent) => void
};

const Menu: Component<MenuProps> = () => {
  let open = false;
  let popup: () => void;

  const handleClose = (
    event: MouseEvent,
    props: MenuProps
  ) => {
    props.onclose?.(event);
    popup?.();
    open = false;
  };

  const createMenu = ({ currentTarget }: MouseEvent, props: MenuProps) => {
    popup = createPopup(
      {
        ...props.popup,
        anchor: (currentTarget as Element)
      },
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
              class='button'
              onclick={event => {
                item.onclick(event);
                if (!item.disableAutoclose) handleClose(event, props);
              }}
            >
              {item.icon && <Icon id={item.icon} />}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    );
    createClickAwayListener(currentTarget as Element, popup);
  };

  const handleOpen = (
    event: MouseEvent,
    props: MenuProps
  ) => {
    props.onopen?.(event);
    createMenu(event, props);
    open = true;
  };

  const handleToggle = (event: MouseEvent, props: MenuProps) => open ?
    handleClose(event, props) :
    handleOpen(event, props);

  const component = new forgo.Component<MenuProps>({
    render(props) {
      return [
        <button
          id={`menu-button-${props.id}`}
          type='button'
          class='Menu button'
          aria-haspopup='true'
          aria-label={`opens ${props.id} menu`}
          aria-expanded={open}
          aria-controls={`menu-${props.id}`}
          onclick={event => handleToggle(event, props)}
        >
          {props.children}
        </button>
      ];
    }
  });

  component.unmount(() => {
    popup?.();
  });

  return component;
};

export default Menu;
