import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView, SettingsView } from '../../../types/views';
import Icon from '../../components/icon/icon';
import { setViewApp, setViewSettings } from '../../state/actions/view.actions';
import { appViewSelector } from '../../state/selectors/view.selectors';
import cx from '../../utils/cx/cx';

import './mainNavigation.scss';

export type MainNavigationProps = {};

const MainNavigation: Component<MainNavigationProps> = () => {
  const views: Record<AppView, IconProps['id']> = {
    [AppView.Library]: 'listMusic'
  };

  const component = new forgo.Component<MainNavigationProps>({
    render() {
      const current = appViewSelector.get();

      return (
        <nav class='MainNavigation' aria-label="app">
          {Object.entries(views).map(([id, icon]) => (
            <button
              key={id}
              type='button'
              class={cx(current === id && 'active')}
              aria-label={`${id} view`}
              onclick={() => setViewApp(id as AppView)}
            >
              <Icon id={icon} />
            </button>
          ))}
          <button
            type='button'
            aria-label='Open settings'
            onclick={() => setViewSettings(SettingsView.Library)}
          >
            <Icon id='cog' />
          </button>
        </nav>
      );
    }
  });

  return appViewSelector.subscribe(component);
};

export default MainNavigation;
