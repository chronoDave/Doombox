import appShape from '../../types/shapes/app.shape';
import userShape from '../../types/shapes/user.shape';
import { Player } from '../lib/player/player';

const player = new Player({
  ...appShape.player,
  ...userShape.player
});

export default player;
