import type { State } from './state';

import Store from '@doombox/renderer/store/store';
import themeShape from '@doombox/types/shapes/theme.shape';
import userShape from '@doombox/types/shapes/user.shape';

import { Route } from './state';

export default new Store<State>({
  route: Route.Appearance,
  user: userShape,
  theme: themeShape
});
