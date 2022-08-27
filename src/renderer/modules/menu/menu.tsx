import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { PopupProps } from '../../components/popup/popup';
import type { IconProps } from '../../components/icon/icon';

import * as forgo from 'forgo';

import { createPopup } from '../../components/popup/popup';
import { Icon } from '../../components/icon/icon';
import createClickAwayListener from '../../utils/clickAwayListener';

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
  popup?: PopupProps
  onopen?: (event: MouseEvent) => void
  onclose?: (event: MouseEvent) => void
};

export const Menu: Component<MenuProps> = () => {
  let open = false;
  let popup: () => void;
  let clickAwayListener: () => void;

  const handleClose = (
    event: MouseEvent,
    props: MenuProps
  ) => {
    props.onclose?.(event);
    popup?.();
    open = false;
  };

  const createMenu = (element: HTMLElement, props: MenuProps) => {
    popup = createPopup(
      element,
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
                if (!item.disableAutoclose) handleClose(event, props);
              }}
            >
              {item.icon && <Icon id={item.icon} />}
              {item.label}
            </button>
          </li>
        ))}
      </ul>,
      props.popup
    );

    clickAwayListener = createClickAwayListener(
      element,
      event => handleClose(event, props)
    );
  };

  const handleOpen = (
    event: forgo.JSX.TargetedMouseEvent<HTMLButtonElement>,
    props: MenuProps
  ) => {
    props.onopen?.(event);
    createMenu(event.currentTarget, props);
    open = true;
  };

  const handleToggle = (
    event: forgo.JSX.TargetedMouseEvent<HTMLButtonElement>,
    props: MenuProps
  ) => open ? handleClose(event, props) : handleOpen(event, props);

  const component = new forgo.Component<MenuProps>({
    render(props) {
      return [
        <button
          class='Menu'
          type='button'
          id={`menu-button-${props.id}`}
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
    clickAwayListener?.();
  });

  return component;
};
