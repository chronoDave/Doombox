import type { State } from '../../types/state';

import deepEqual from 'fast-deep-equal';

import createSelector from '../../utils/createSelector';
import store from '../store';

const createSearchSelector = <T extends unknown>(selector: (state: State) => T[] | null) =>
  createSelector(store)(() => selector(store.get()), (prevState, curState) => !deepEqual(
    selector(prevState),
    selector(curState)
  ));

export const songSearchSelector =
  createSearchSelector(state => state.search.songs);

export const albumSearchSelector =
  createSearchSelector(state => state.search.albums);

export const labelSearchSelector =
  createSearchSelector(state => state.search.labels);
