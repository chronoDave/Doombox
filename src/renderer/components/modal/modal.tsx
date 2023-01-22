import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import createFocusTrap from '../../utils/createFocusTrap';
import cx from '../../utils/cx';
import portal from '../../utils/portal';
import Icon from '../icon/icon';

import './modal.scss';

export type DialogProps = {
  id: string
  title: string
  size: 'md',
  onclose?: () => void
};

export const Dialog: Component<DialogProps & { close: () => void }> = () => {
  const component = new forgo.Component<DialogProps & { close:() => void }>({
    render(props) {
      const idTitle = `${props.id}-title`;

      return (
        <div class={cx('Modal', props.size)} id={props.id}>
          <div class="bg" />
          <div
            class="main"
            aria-modal="true"
            role="dialog"
            aria-labelledby={idTitle}
          >
            <div class="header">
              <h2 id={idTitle} class="title">
                {props.title}
              </h2>
              <button type="button">
                <Icon id="close" />
              </button>
            </div>
            <div class="body">
              {props.children}
            </div>
          </div>
        </div>
      );
    }
  });

  component.mount(props => {
    const root = document.getElementById(props.id);
    const elements = root?.querySelectorAll<HTMLElement>('a[href]:not([disabled]), button:not([disabled])');

    if (elements) {
      const handleKeyDown = createFocusTrap(elements);
      root?.addEventListener('keydown', e => handleKeyDown(e, {
        onescape: props.close
      }), { passive: true });
    }
  });

  component.unmount(props => props.onclose?.());

  return component;
};

const createDialog = (
  children: forgo.ForgoComponentCtor,
  props: DialogProps
) => portal(document.body, close => (
  <Dialog
    close={close}
    {...props}
  >
    {children}
  </Dialog>
));

export default createDialog;
