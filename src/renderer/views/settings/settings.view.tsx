import type { Tab } from '../../components/tabs/tabs';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { SettingsView as View } from '../../../types/views';
import Icon from '../../components/icon/icon';
import Tabs from '../../components/tabs/tabs';
import { setViewSettings } from '../../state/actions/view.actions';
import { settingsViewSelector } from '../../state/selectors/view.selectors';

import Appearance from './settingsAppearance/settingsAppearance';
import Library from './settingsLibrary/settingsLibrary';

import './settings.view.scss';

export type SettingsViewProps = {};

const SettingsView: Component<SettingsViewProps> = () => {
  const component = new forgo.Component<SettingsViewProps>({
    render() {
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

      return (
        <div class='View SettingsView'>
          <Tabs
            tabs={tabs}
            active={settingsViewSelector.get()}
            ontab={setViewSettings}
          />
        </div>
      );
    }
  });

  return settingsViewSelector.subscribe(component);
};

export default SettingsView;
