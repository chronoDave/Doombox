import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Player from '../../modules/player/player';
import Queue from '../../modules/queue/queue';

import HomeRouter from './homeRouter/homeRouter';
import HomeToolbar from './homeToolbar/homeToolbar';

import './home.scss';

export type HomeProps = {};

const Home: Component<HomeProps> = () => {
  const component = new forgo.Component<HomeProps>({
    render() {
      return (
        <main class='Home'>
          <div class='panel column'>
            <Player />
            <Queue />
          </div>
          <div class='panel column'>
            <HomeToolbar />
            <HomeRouter />
          </div>
        </main>
      );
    }
  });

  return component;
};

export default Home;
