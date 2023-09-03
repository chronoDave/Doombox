import type { Tab } from '../../components/tabs/tabs';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { SettingsView as View } from '../../../types/views';
import Icon from '../../components/icon/icon';
import Tabs from '../../components/tabs/tabs';
import { setViewSettings } from '../../state/actions/view.actions';
import { settingsViewSelector } from '../../state/selectors/view.selectors';
import cx from '../../utils/cx/cx';
import createFocusTrap from '../../utils/focusTrap/focusTrap';
import Appearance from '../../views/settingsAppearance/settingsAppearance';
import Library from '../../views/settingsLibrary/settingsLibrary';

import './settings.scss';

export type SettingsProps = {};

const Settings: Component<SettingsProps> = () => {
  const ref: forgo.ForgoRef<HTMLElement> = {};
  let focusTrap: () => void | undefined;

  const component = new forgo.Component<SettingsProps>({
    render() {
      const view = settingsViewSelector.get();
      const tabs: Record<View, Tab> = {
        [View.Appearance]: {
          label: <Icon id='palette' />,
          render: <Appearance />
        },
        [View.Library]: {
          label: <Icon id='listMusic' />,
          render: <Library />
        }
      };

      if (view && ref.value) {
        focusTrap?.();
        focusTrap = createFocusTrap(ref.value, { onEscape: () => setViewSettings(null) });
      }

      return (
        <div ref={ref} class={cx('Settings', !view && 'invisible')}>
          <Tabs
            tabs={tabs}
            active={view}
            ontab={setViewSettings}
          />
          <div class='actions'>
            <button
              type='button'
              aria-label='Close settings'
              onclick={() => setViewSettings(null)}
            >
              <Icon id='close' />
              Esc
            </button>
          </div>
        </div>
      );
    }
  });

  return settingsViewSelector.subscribe(component);
};

export default Settings;
