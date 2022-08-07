import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type MenuButtonProps = {
  id: string
  onclick: (event: forgo.JSX.TargetedMouseEvent<HTMLButtonElement>) => void
  open?: boolean
};

const MenuButton: Component<MenuButtonProps> = () => new forgo.Component({
  render(props) {
    return (
      <button
        type='button'
        id={`menu-button-${props.id}`}
        aria-haspopup='true'
        aria-label={`opens ${props.id} menu`}
        aria-expanded={props.open}
        aria-controls={`menu-${props.id}`}
        onclick={props.onclick}
      >
        {props.children}
      </button>
    );
  }
});

export default MenuButton;
