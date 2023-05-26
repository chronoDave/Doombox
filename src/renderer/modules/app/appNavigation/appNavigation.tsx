import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../../types/views';
import Icon from '../../../components/icon/icon';
import { setViewApp } from '../../../state/actions/view.actions';
import { appViewSelector } from '../../../state/selectors/view.selectors';
import cx from '../../../utils/cx/cx';

import './appNavigation.scss';

export type AppNavigationProps = {};

const AppNavigation: Component<AppNavigationProps> = () => {
  const views: Record<AppView, IconProps['id']> = {
    [AppView.Queue]: 'playlistMusic',
    [AppView.Player]: 'playCircle',
    [AppView.Song]: 'musicNote',
    [AppView.Album]: 'musicBox',
    [AppView.Label]: 'accountMusic',
    [AppView.Settings]: 'cog'
  };

  const component = new forgo.Component<AppNavigationProps>({
    render() {
      const current = appViewSelector.get();

      return (
        <nav class='AppNavigation' aria-label="app">
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
        </nav>
      );
    }
  });

  return appViewSelector.subscribe(component);
};

export default AppNavigation;
