import type { State } from '../types';

import produce from 'immer';

import createSlice from '../../lib/state/createSlice';

export default createSlice<State>('player')({
  setCurrent: (current: { id: string, duration: number }) => produce(draft => {
    draft.player.current = current;
  })
});
