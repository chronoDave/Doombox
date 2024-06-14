import store from '../../../store';

export default store.select(state => ({
  muted: state.player.muted,
  volume: state.player.volume
}));
