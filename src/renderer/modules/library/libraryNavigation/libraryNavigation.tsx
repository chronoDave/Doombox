import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../../types/views';
import { setRoute } from '../../../actions/route.actions';
import { setViewApp } from '../../../actions/view.actions';
import Icon from '../../../components/icon/icon';
import { Route } from '../../../types/state';
import cx from '../../../utils/cx/cx';

import subscribe from './libraryNavigation.state';

import './libraryNavigation.scss';

export type LibraryNavigationProps = {};

const LibraryNavigation: Component<LibraryNavigationProps> = () => {
  const views: Record<AppView, IconProps['id']> = {
    [AppView.Album]: 'listMusic'
  };

  const component = new forgo.Component<LibraryNavigationProps>({
    render() {
      const current = subscribe(component);

      return (
        <nav class='LibraryNavigation' aria-label="library">
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
            onclick={() => setRoute(Route.Settings)}
          >
            <Icon id='cog' />
          </button>
        </nav>
      );
    }
  });

  return component;
};

export default LibraryNavigation;
