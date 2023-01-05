import type { IconProps } from '../../../../components/icon/icon';
import type { State } from '../../../../store/store';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import ButtonIcon from '../../../../components/buttonIcon/button.icon';
import store from '../../../../store/store';
import cx from '../../../../utils/cx';

import './library.navigation.scss';

export type LibraryNavigationProps = {};

type LayoutItem = {
  layout: State['view']['library']
  icon: IconProps['id']
};

const LibraryNavigation: Component<LibraryNavigationProps> = () => {
  const layouts: LayoutItem[] = [
    { layout: 'playlist', icon: 'playlistMusic' },
    { layout: 'player', icon: 'playCircle' },
    { layout: 'song', icon: 'musicNote' },
    { layout: 'album', icon: 'musicBox' },
    { layout: 'label', icon: 'accountMusic' }
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
                icon='cog'
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
