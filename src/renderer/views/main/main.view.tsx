import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../types/views';
import MainLibrary from '../../modules/mainLibrary/mainLibrary';
import MainNavigation from '../../modules/mainNavigation/mainNavigation';
import Player from '../../modules/player/player';
import { appViewSelector } from '../../state/selectors/view.selectors';

import './main.view.scss';

export type MainViewProps = {};

const MainView: Component<MainViewProps> = () => {
  const views: Record<AppView, forgo.Component> = {
    [AppView.Library]: <MainLibrary />
  };

  const component = new forgo.Component<MainViewProps>({
    render() {
      const appView = appViewSelector.get();

      return (
        <main class='MainView'>
          <MainNavigation />
          <Player />
          {views[appView]}
        </main>
      );
    }
  });

  appViewSelector.subscribe(component);

  return component;
};

export default MainView;
