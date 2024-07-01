import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import debounce from '../../../lib/function/debounce';
import cx from '../../lib/css/cx';
import portal from '../../lib/dom/portal/portal';

import './popup.scss';

type Position =
  'top-left' |
  'top' |
  'top-right' |
  'right' |
  'bottom-right' |
  'bottom' |
  'bottom-left' |
  'left';

export type PopupProps = {
  position: Position
  anchor: Element
};

const Popup: Component<PopupProps> = () => {
  const abortController = new AbortController();

  const component = new forgo.Component<PopupProps>({
    render(props) {
      const { x, y } = props.anchor.getBoundingClientRect();

      return (
        <div
          class={cx('Popup', props.position)}
          style={{
            top: `${y}px`,
            left: `${x}px`
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
) => portal(<Popup {...props}>{children}</Popup>);
