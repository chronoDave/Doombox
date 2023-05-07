import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import debounce from '../../utils/debounce';
import portal from '../../utils/portal/portal';

import './popup.scss';

type Position =
  'top-left' |
  'top' |
  'top-right' |
  'right-top' |
  'right' |
  'right-bottom' |
  'bottom-right' |
  'bottom' |
  'bottom-left' |
  'left-bottom' |
  'left' |
  'left-top';

export type PopupProps = {
  position: Position
  anchor: Element
};

const Popup: Component<PopupProps> = () => {
  const abortController = new AbortController();

  const transform: Record<Position, string> = {
    'top-left': 'translateY(-100%)',
    top: 'translate(-50%, -100%)',
    'top-right': 'translateY(-100%)',
    'left-top': 'translateX(100%)',
    left: 'translate(100%, -50%)',
    'left-bottom': 'translateX(100%)',
    'bottom-right': 'translateY(100%)',
    bottom: 'translate(-50%, 100%)',
    'bottom-left': 'translateY(100%)',
    'right-bottom': 'translateX(-100%)',
    right: 'translate(-100%, -50%)',
    'right-top': 'translateX(-100%)'
  };

  const component = new forgo.Component<PopupProps>({
    render(props) {
      const { x, y } = props.anchor.getBoundingClientRect();

      return (
        <div
          class='Popup'
          style={{
            top: `${y}px`,
            left: `${x}px`,
            transform: transform[props.position]
          }}
        >
          {props.children}
        </div>
      );
    }
  });

  component.mount(() => {
    const update = debounce(() => { component.update(); });

    window.addEventListener('resize', update, { passive: true, signal: abortController.signal });
  });

  component.unmount(() => {
    abortController.abort();
  });

  return component;
};

export const createPopup = (
  props: PopupProps,
  children: forgo.Component | forgo.Component[]
) => portal(<Popup {...props}>{children}</Popup>, { anchor: props.anchor });
