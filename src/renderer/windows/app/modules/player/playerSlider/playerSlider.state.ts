import store from '../../../store';

export default store.select(state => ({
  duration: state.player.current.duration,
  position: state.player.current.position
}));
