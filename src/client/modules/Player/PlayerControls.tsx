import Button from '../../components/Button';
import VolumeIcon from '../../components/Volume/VolumeIcon';
import Audio from '../../audio';

export default () => (
  <div className="controls">
    <Button
      title={Audio.muted ? 'Unmute' : 'Mute'}
      onClick={() => { Audio.muted = !Audio.muted; }}
    >
      <VolumeIcon />
    </Button>
  </div>
);
