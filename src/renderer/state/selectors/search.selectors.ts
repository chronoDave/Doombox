import type { State } from '../../types/state';

import createSelector from '../../utils/createSelector';
import store from '../store';

const createSearchSelector = <T extends unknown>(selector: (state: State) => T[] | null) =>
  createSelector(store)(() => selector(store.get()), (prevState, curState) => {
    const prev = selector(prevState);
    const cur = selector(curState);

    return (
      !prev ||
      !cur ||
      prev.length !== cur.length ||
      prev.some((x, i) => cur[i] !== x)
    );
  });

export const songSearchSelector =
  createSearchSelector(state => state.search.songs);

export const albumSearchSelector =
  createSearchSelector(state => state.search.albums);

export const labelSearchSelector =
  createSearchSelector(state => state.search.labels);
