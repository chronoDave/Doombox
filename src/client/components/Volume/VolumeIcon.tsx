import { connect } from 'inferno-redux';

import Icon, { IconProps } from '../Icon';
import { State } from '../../redux';

export interface VolumeIconProps extends Omit<IconProps, 'id'> {
  volume: number,
  muted: boolean
}

const VolumeIcon = ({ volume, muted }: VolumeIconProps) => {
  const getId = () => {
    if (muted) return 'mute';
    if (volume === 0) return 'volumeLow';
    if (volume === 1) return 'volumeHigh';
    return 'volumeMedium';
  };

  return <Icon id={getId()} />;
};

const mapStateToProps = (state: State) => ({
  volume: state.audio.volume,
  muted: state.audio.muted
});

export default connect(mapStateToProps)(VolumeIcon);
