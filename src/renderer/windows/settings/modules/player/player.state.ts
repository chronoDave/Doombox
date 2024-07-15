import produce from 'immer';

import store from '../../state/store';

export default store.select(state => ({
  loop: state.user.player.loop,
  autoplay: state.user.player.autoplay
}));

export const setLoop = (loop: boolean) => store.set(produce(draft => {
  draft.user.player.loop = loop;
}));

export const setAutoplay = (autoplay: boolean) => store.set(produce(draft => {
  draft.user.player.autoplay = autoplay;
}));
