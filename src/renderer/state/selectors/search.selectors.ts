import type { State } from '../../types/state';

import deepEqual from 'fast-deep-equal';

import createSelector from '../../utils/createSelector';
import store from '../store';

const createSearchSelector = <T extends unknown>(selector: (state: State) => T[] | null) =>
  createSelector(store)(() => selector(store.get()), (prevState, curState) => {
    const prev = selector(prevState);
    const cur = selector(curState);

    if (!prev && !cur) return false;
    if (prev?.length === cur?.length) return false;
    if (prev?.every((x, i) => deepEqual(cur?.[i], x))) return false;
    return true;
  });

export const songSearchSelector =
  createSearchSelector(state => state.search.songs);

export const albumSearchSelector =
  createSearchSelector(state => state.search.albums);

export const labelSearchSelector =
  createSearchSelector(state => state.search.labels);
