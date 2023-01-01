import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { IconProps } from '../../../../components/icon/icon';
import type { State } from '../../../../store/store';

import * as forgo from 'forgo';

import store from '../../../../store/store';
import cx from '../../../../utils/cx';
import ButtonIcon from '../../../../components/buttonIcon/button.icon';

import './library.navigation.scss';

export type LibraryNavigationProps = {};

type LayoutItem = {
  layout: State['view']['library']
  icon: IconProps['id']
};

const LibraryNavigation: Component<LibraryNavigationProps> = () => {
  const layouts: LayoutItem[] = [
    { layout: 'player', icon: 'player' },
    { layout: 'song', icon: 'songs' },
    { layout: 'album', icon: 'album' },
    { layout: 'label', icon: 'libraryMusic' }
  ];

  const component = new forgo.Component<LibraryNavigationProps>({
    render() {
      return (
        <nav aria-label="library">
          <ul>
            {layouts.map(({ layout, icon }) => (
              <li key={layout} class={cx({ active: layout === store.get().view.library })}>
                <ButtonIcon
                  icon={icon}
                  aria-label={`navigate to library ${layout}`}
                  onclick={() => store.dispatch('setViewLibrary', layout)}
                />
              </li>
            ))}
            <li>
              <ButtonIcon
                icon='settings'
                aria-label='open settings'
                onclick={() => {
                  store.dispatch('setViewSettings', 'library');
                  store.dispatch('setLayout', 'settings');
                }}
              />
            </li>
          </ul>
        </nav>
      );
    }
  });

  return component;
};

export default LibraryNavigation;
