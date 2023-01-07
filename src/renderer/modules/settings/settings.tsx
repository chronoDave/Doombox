import type { State } from '../../store/store';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setViewSettings } from '../../store/actions/view.actions';
import store from '../../store/store';
import cx from '../../utils/cx';
import AppearanceView from '../../views/settings/appearance/appearance.view';
import LibraryView from '../../views/settings/library/library.view';

import './settings.scss';

export type SettingsProps = {};

const Settings: Component<SettingsProps> = () => {
  const views: Record<State['view']['settings'], forgo.Component> = {
    appearance: <AppearanceView />,
    library: <LibraryView />
  };

  const handleClick = (e: UIEvent) => {
    const view = (e.target as HTMLElement).id as State['view']['settings'];
    if (view) setViewSettings(view);
  };

  const component = new forgo.Component<SettingsProps>({
    render() {
      const state = store.get();

      return (
        <div class='Settings' id="settings">
          <ul
            aria-label="settings"
            role="tablist"
            onclick={handleClick}
            onkeydown={e => {
              if (e.code === 'Space') handleClick(e);
              if (
                e.code === 'ArrowRight' ||
                e.code === 'ArrowLeft' ||
                e.code === 'Home' ||
                e.code === 'End'
              ) {
                const active = e.target as HTMLElement;
                const tabs = Array.from<HTMLElement>(e.currentTarget.querySelectorAll('[role=tab]'));
                const i = tabs.findIndex(tab => tab.id === active.id);

                if (e.code === 'ArrowRight') tabs[i === (tabs.length - 1) ? 0 : (i + 1)].focus();
                if (e.code === 'ArrowLeft') tabs[i === 0 ? (tabs.length - 1) : (i - 1)].focus();
                if (e.code === 'Home') tabs[0].focus();
                if (e.code === 'End') tabs[tabs.length - 1].focus();
              }
            }}
          >
            {Object.keys(views).map(key => (
              <li>
                <button
                  id={key}
                  type="button"
                  key={key}
                  role="tab"
                  aria-selected={state.view.settings === key}
                  aria-controls={`${key}-panel`}
                  tabindex={state.view.settings === key ? 0 : -1}
                >
                  {key}
                </button>
              </li>
            ))}
          </ul>
          {Object.entries(views).map(([key, view]) => (
            <section
              id={`${key}-panel`}
              role="tabpanel"
              aria-labelledby={key}
              class={cx({
                hidden: state.view.settings !== key
              })}
            >
              <h1 class="title">{key}</h1>
              {view}
            </section>
          ))}
        </div>
      );
    }
  });

  store.subscribe(component, ['view']);

  return component;
};

export default Settings;
