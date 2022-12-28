import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { SettingsView } from '../../state/slices/settings.slice';

import * as forgo from 'forgo';

import * as state from '../../state/state';
import AppearanceView from '../../views/settings/appearance/appearance.view';
import cx from '../../utils/cx';
import updateOnEvents from '../../utils/updateOnEvents';

import './settings.scss';

export type SettingsProps = {};

const Settings: Component<SettingsProps> = () => {
  const views: Record<SettingsView, forgo.Component> = {
    appearance: <AppearanceView />,
    library: <div>E</div>
  };

  const handleClick = (e: UIEvent) => {
    const view = (e.target as HTMLElement).id as SettingsView;
    if (view) state.actions.settings.setView(view);
  };

  const component = new forgo.Component<SettingsProps>({
    render() {
      return (
        <main class='Settings' id="settings">
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
                  aria-selected={state.settings.view === key}
                  aria-controls={`${key}-panel`}
                  tabindex={state.settings.view === key ? 0 : -1}
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
                hidden: state.settings.view !== key
              })}
            >
              {view}
            </section>
          ))}
        </main>
      );
    }
  });

  updateOnEvents(component, ['settings.setView']);

  return component;
};

export default Settings;
