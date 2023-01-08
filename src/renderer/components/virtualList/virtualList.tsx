import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import createVirtualList from '../../utils/createVirtualList';
import debounce from '../../utils/debounce';

import './virtualList.scss';

export type VirtualListProps = {
  size: number
  height: number | ((index: number, width: number) => number)
  overflow: number
  render: (i: number) => forgo.Component | forgo.Component[]
};

const VirtualList: Component<VirtualListProps> = () => {
  let virtual: ReturnType<typeof createVirtualList> | undefined;

  const { abort, signal } = new AbortController();
  const ref: forgo.ForgoRef<Element> = {};
  const virtualize = debounce(props => {
    if (ref.value) virtual = createVirtualList(ref.value, props);
  });

  const component = new forgo.Component<VirtualListProps>({
    render(props) {
      return (
        <div class='VirtualList' ref={ref}>
          <ul
            style={{
              '--item-height': `${props.height}px`,
              height: `${virtual?.height ?? 0}px`
            }}
          >
            {virtual?.view?.map(({ index, top, height }) => (
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

  component.mount(async props => {
    window.addEventListener('resize', () => {
      virtualize(props);
      component.update();
    }, { passive: true, signal });

    ref.value?.addEventListener('scroll', () => {
      virtualize(props);
      component.update();
    }, { passive: true, signal });

    await virtualize(props);
    component.update();
  });

  component.unmount(() => {
    abort();
  });

  return component;
};

export default VirtualList;
