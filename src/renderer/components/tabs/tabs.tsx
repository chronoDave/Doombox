import * as forgo from 'forgo';

import wrap from '../../../utils/number/wrap';
import cx from '../../utils/cx/cx';

import './tabs.scss';

export type Tab = {
  label: string | forgo.Component
  render: forgo.Component
};

export type TabsProps<T extends Record<string, Tab>> = {
  tabs: T,
  active: keyof T,
  ontab: (id: keyof T, event: (
    forgo.JSX.TargetedKeyboardEvent<HTMLButtonElement> |
    forgo.JSX.TargetedMouseEvent<HTMLButtonElement>
  )) => void
};

const Tabs = <T extends Record<string, Tab>>(
  initial: TabsProps<T>
): forgo.Component<TabsProps<T>> => {
  const ref: forgo.ForgoRef<HTMLUListElement> = {};

  const component = new forgo.Component<TabsProps<T>>({
    render(props) {
      return (
        <div class='Tabs'>
          <ul role='tablist' ref={ref}>
            {Object.entries(props.tabs).map(([id, tab]) => (
              <li key={id}>
                <button
                  type='button'
                  role='tab'
                  aria-selected={id === props.active}
                  aria-controls={`${id}-panel`}
                  tabindex={id === props.active ? 0 : -1}
                  onclick={event => props.ontab(id, event)}
                  onkeydown={event => {
                    if (event.code === 'Space') props.ontab(id, event);
                    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.code)) {
                      const tabs = Array.from(ref.value?.querySelectorAll<HTMLButtonElement>('[role=tab]') ?? []);
                      const active = tabs.findIndex(element => element === document.activeElement);

                      console.log(active);

                      if (event.code === 'ArrowLeft') tabs[wrap(0, tabs.length - 1, active - 1)].focus();
                      if (event.code === 'ArrowRight') tabs[wrap(0, tabs.length - 1, active + 1)].focus();
                      if (event.code === 'Home') tabs[0].focus();
                      if (event.code === 'End') tabs[tabs.length - 1].focus();
                    }
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div class='panels'>
            {Object.entries(props.tabs).map(([id, tab]) => (
              <section
                id={`${id}-panel`}
                role='tabpanel'
                aria-labelledby={id}
                class={cx('panel', id !== props.active && 'hidden')}
              >
                {tab.render}
              </section>
            ))}
          </div>
        </div>
      );
    }
  });

  return component;
};

export default Tabs;
