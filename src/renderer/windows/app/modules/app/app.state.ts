import store from '../../state/store';

export default store.select(() => 'Doombox', {
  selector: async state => {
    if (!state.player.current.id) return 'Doombox';

    const current = await window.ipc.entity.song(state.player.current.id);
    return `${current.artist} - ${current.title} (${current.album})`;
  },
  shouldUpdate: (cur, prev) => cur.player.current.id !== prev.player.current.id
});
