import type { ViewFrame } from '../../utils/createViewFrame';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { debounceFrame } from '../../../utils/function/debounce';
import createViewFrame from '../../utils/createViewFrame';

import './virtualList.scss';

export type VirtualListProps = {
  size: number
  height: number
  overflow: number
  render: (i: number) => forgo.Component | forgo.Component[]
};

const VirtualList: Component<VirtualListProps> = () => {
  let virtual: ViewFrame = { height: 0, items: [] };

  const { abort, signal } = new AbortController();
  const ref: forgo.ForgoRef<Element> = {};

  const component = new forgo.Component<VirtualListProps>({
    render(props) {
      if (ref.value) {
        // const old = virtual;
        virtual = createViewFrame({
          size: props.size,
          overflow: props.overflow,
          item: { height: props.height },
          container: {
            width: ref.value.clientWidth,
            height: ref.value.clientHeight,
            y: ref.value.scrollTop
          }
        });

        // if (
        //   old.items[0]?.index !== virtual.items[0]?.index ||
        //   old.items.length !== virtual.items.length
        // ) component.update();

        // component.update();
      }

      return (
        <div class='VirtualList' ref={ref}>
          <ul
            style={{
              '--item-height': `${props.height}px`,
              height: `${virtual?.height ?? 0}px`
            }}
          >
            {virtual?.items?.map(({ index, top, height }) => (
              <li
                key={index}
                style={{
                  top: `${top}px`,
                  height: `${height}px`
                }}
              >
                {props.render(index)}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  });

  /** Doesn't update correctly when new props are applied */
  component.mount(async props => {
    const virtualize = () => {
      if (ref.value) {
        // const old = virtual;
        virtual = createViewFrame({
          size: props.size,
          overflow: props.overflow,
          item: { height: props.height },
          container: {
            width: ref.value.clientWidth,
            height: ref.value.clientHeight,
            y: ref.value.scrollTop
          }
        });

        // if (
        //   old.items[0]?.index !== virtual.items[0]?.index ||
        //   old.items.length !== virtual.items.length
        // ) component.update();

        component.update();
      }
    };

    window.addEventListener('resize', () => {
      virtualize();
    }, { passive: true, signal });

    ref.value?.addEventListener('scroll', () => {
      virtualize();
    }, { passive: true, signal });

    virtualize();
  });

  component.unmount(() => {
    abort();
  });

  return component;
};

export default VirtualList;
