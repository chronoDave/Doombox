import deepEqual from 'fast-deep-equal';
import { toRomaji } from 'wanakana';

import hasKanji from '../../../utils/string/hasKanji';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const userLibrarySelector = createSelector(store)(
  () => store.get().user.library,
  (prev, cur) => !deepEqual(prev, cur)
);

export const romajiSelector = createSelector(store)(
  (x: string | null) => {
    if (!x || !store.get().user.scanner.romaji || hasKanji(x)) return x;
    return toRomaji(x, { passRomaji: true });
  },
  (prev, cur) => prev.user.scanner.romaji !== cur.user.scanner.romaji
);
