import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputCheckbox from '@doombox/components/input-checkbox/input-checkbox';

import subscribe, { setAutoplay, setLoop } from './player.state';

export type PlayerProps = {};

const Player: Component<PlayerProps> = () => {
  const component = new forgo.Component<PlayerProps>({
    render() {
      const { autoplay, loop } = subscribe('Player', component);

      return (
        <form>
          <InputCheckbox
            id='player-autoplay'
            label='Autoplay'
            checked={autoplay}
            onchange={setAutoplay}
          >
            <p>Plays next track in queue after song finishes</p>
          </InputCheckbox>
          <InputCheckbox
            id='player-loop'
            label='Loop'
            checked={loop}
            onchange={setLoop}
          >
            <p>Plays first track in playlist after last song finishes</p>
          </InputCheckbox>
        </form>
      );
    }
  });

  return component;
};

export default Player;
