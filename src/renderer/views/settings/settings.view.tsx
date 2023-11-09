import type { Tab } from '../../components/tabs/tabs';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { SettingsView as View } from '../../../types/views';
import { closeSettings, setViewSettings } from '../../actions/view.actions';
import Icon from '../../components/icon/icon';
import Tabs from '../../components/tabs/tabs';
import cx from '../../utils/cx/cx';
import createFocusTrap from '../../utils/focusTrap/focusTrap';

import subscribe from './settings.state';
import Appearance from './settingsAppearance/settingsAppearance';
import Library from './settingsLibrary/settingsLibrary';

import './settings.view.scss';

export type SettingsViewProps = {};

const SettingsView: Component<SettingsViewProps> = () => {
  const ref: forgo.ForgoRef<HTMLElement> = {};
  let focusTrap: () => void | undefined;

  const component = new forgo.Component<SettingsViewProps>({
    render() {
      const view = subscribe(component);
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
        focusTrap = createFocusTrap(ref.value, { onEscape: closeSettings });
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
              onclick={closeSettings}
            >
              <Icon id='close' />
              Esc
            </button>
          </div>
        </div>
      );
    }
  });

  return component;
};

export default SettingsView;
