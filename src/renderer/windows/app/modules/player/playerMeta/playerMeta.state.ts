import store from '../../../state/store';

export default store.select(() => null, {
  selector: async state => {
    if (!state.player.current.id) return null;
    return window.ipc.entity.song(state.player.current.id);
  },
  shouldUpdate: (cur, prev) => cur.player.current.id !== prev.player.current.id
});
