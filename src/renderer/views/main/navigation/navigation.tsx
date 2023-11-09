import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView, SettingsView } from '../../../../types/views';
import { setViewApp, setViewSettings } from '../../../actions/view.actions';
import Icon from '../../../components/icon/icon';
import cx from '../../../utils/cx/cx';

import subscribe from './navigation.state';

import './navigation.scss';

export type NavigationProps = {};

const Navigation: Component<NavigationProps> = () => {
  const views: Record<AppView, IconProps['id']> = {
    [AppView.Library]: 'listMusic'
  };

  const component = new forgo.Component<NavigationProps>({
    render() {
      const current = subscribe(component);

      return (
        <nav class='Navigation' aria-label="app">
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

  return component;
};

export default Navigation;
