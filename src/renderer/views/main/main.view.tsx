import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../types/views';

import Library from './library/library';
import subscribe from './main.state';
import Navigation from './navigation/navigation';
import Player from './player/player';
import Queue from './queue/queue';

import './main.view.scss';

export type MainViewProps = {};

const MainView: Component<MainViewProps> = () => {
  const views: Record<AppView, forgo.Component> = {
    [AppView.Library]: <Library />
  };

  const component = new forgo.Component<MainViewProps>({
    render() {
      const view = subscribe(component);

      return (
        <main class='MainView'>
          <Navigation />
          <div class='panel'>
            <Player />
            <Queue />
          </div>
          {views[view]}
        </main>
      );
    }
  });

  return component;
};

export default MainView;
