import deepEqual from 'fast-deep-equal';

import store from '../../state/store';

export default store.select(state => ({
  index: state.queue.index,
  current: state.queue.songs[state.queue.index],
  title: state.queue.title,
  duration: 0,
  queue: []
}), {
  selector: async state => {
    const queue = await window.ipc.entity.songs(state.queue.songs);

    return ({
      index: state.queue.index,
      current: state.queue.songs[state.queue.index],
      title: state.queue.title,
      duration: queue.reduce((acc, cur) => acc + (cur.duration ?? 0), 0),
      queue
    });
  },
  shouldUpdate: (cur, prev) => !deepEqual(cur.queue.songs, prev.queue.songs)
});
