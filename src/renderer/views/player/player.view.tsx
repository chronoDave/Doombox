import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { AudioStatus } from '../../lib/audio';
import { next, pause, previous } from '../../state/actions/player.actions';
import { playerStatusSelector } from '../../state/selectors/player.selectors';

import PlayerCover from './playerCover/playerCover';
import PlayerMetadata from './playerMetadata/playerMetadata';
import PlayerSlider from './playerSlider/playerSlider';
import PlayerVolume from './playerVolume/playerVolume';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const playerStatus = playerStatusSelector.get();

      return (
        <div class='View PlayerView'>
          <div class='metadata'>
            <PlayerCover />
            <PlayerMetadata />
          </div>
          <div class='controls'>
            <PlayerSlider />
            <div class='buttons'>
              <PlayerVolume />
              <button type='button' onclick={() => previous()}>
                <Icon id='previous' />
              </button>
              <button type='button' onclick={() => pause()}>
                <Icon id={playerStatus === AudioStatus.Playing ? 'pause' : 'play'} />
              </button>
              <button type='button' onclick={() => next()}>
                <Icon id='next' />
              </button>
            </div>
          </div>
        </div>
      );
    }
  });

  playerStatusSelector.subscribe(component);

  return component;
};

export default PlayerView;
