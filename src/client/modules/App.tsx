import VolumeIcon from '../components/Volume/VolumeIcon';
import Window from './Window';
import Audio from '../audio';
import PlayerControls from './Player/PlayerControls';

export default () => (
  <div className="App">
    <Window />
    <div className="root">
      <div className="Player">
        <PlayerControls />
      </div>
    </div>
  </div>
);
