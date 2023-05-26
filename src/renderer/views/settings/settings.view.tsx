import type { SettingsView as View } from '../../../types/views';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setViewSettings } from '../../state/actions/view.actions';
import { settingsViewSelector } from '../../state/selectors/view.selectors';
import cx from '../../utils/cx/cx';

import Appearance from './settingsAppearance/settingsAppearance';
import Library from './settingsLibrary/settingsLibrary';

import './settings.view.scss';

export type SettingsViewProps = {};

const SettingsView: Component<SettingsViewProps> = () => {
  const views: Record<View, forgo.Component> = {
    appearance: <Appearance />,
    library: <Library />
  };

  const handleClick = (e: UIEvent) => {
    const view = (e.target as HTMLElement).id as View;
    if (view) setViewSettings(view);
  };

  const component = new forgo.Component<SettingsViewProps>({
    render() {
      const view = settingsViewSelector.get();

      return (
        <div class='View SettingsView' id="settings">
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
                  aria-selected={view === key}
                  aria-controls={`${key}-panel`}
                  tabindex={view === key ? 0 : -1}
                >
                  {key}
                </button>
              </li>
            ))}
          </ul>
          {Object.entries(views).map(([key, child]) => (
            <section
              id={`${key}-panel`}
              role="tabpanel"
              aria-labelledby={key}
              class={cx({
                hidden: view !== key
              })}
            >
              <h1 class="title">{key}</h1>
              {child}
            </section>
          ))}
        </div>
      );
    }
  });

  return settingsViewSelector.subscribe(component);
};

export default SettingsView;
