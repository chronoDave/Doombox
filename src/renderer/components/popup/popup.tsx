import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import portal from '../../utils/portal';

import './popup.scss';

type Axis = 'start' | 'center' | 'end';

export type PopupProps = {
  align: {
    x: Axis
    y: Axis
  }
};

const Popup: Component<PopupProps> = () => new forgo.Component({
  render(props) {
    const lutAxis: Record<Axis, number> = { start: 0, center: 50, end: 100 };
    const x = lutAxis[props.align.x];
    const y = lutAxis[props.align.y];

    return (
      <div
        class='Popup'
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-${x}, -${y})`
        }}
      >
        {props.children}
      </div>
    );
  }
});

export const createPopup = (
  anchor: HTMLElement,
  element: forgo.ForgoComponentCtor,
  props?: Partial<PopupProps>
) => {
  const align = {
    x: props?.align?.x ?? 'center',
    y: props?.align?.y ?? 'start'
  };

  return portal(anchor, <Popup align={align}>{element}</Popup>);
};
