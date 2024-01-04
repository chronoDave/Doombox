import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Player from '../../modules/player/player';
import Queue from '../../modules/queue/queue';
import Library from '../library/library';

import HomeNavigation from './homeNavigation/homeNavigation';

import './home.scss';

export type HomeProps = {};

const Home: Component<HomeProps> = () => {
  const component = new forgo.Component<HomeProps>({
    render() {
      return (
        <main class='Home'>
          <HomeNavigation />
          <div class='player'>
            <Player />
            <Queue />
          </div>
          <Library />
        </main>
      );
    }
  });

  return component;
};

export default Home;
