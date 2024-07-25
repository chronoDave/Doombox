import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Player from '../player/player';
import Queue from '../queue/queue';

import Navigation from './navigation/navigation';
import Router from './router/router';

import './home.scss';

export type HomeProps = {};

const Home: Component<HomeProps> = () => {
  const component = new forgo.Component<HomeProps>({
    render() {
      return (
        <main class='home'>
          <div class='panel column'>
            <Player />
            <Queue />
          </div>
          <div class='panel column'>
            <Navigation />
            <Router />
          </div>
        </main>
      );
    }
  });

  return component;
};

export default Home;
