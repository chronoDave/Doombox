import type { State } from './state';

import themeShape from '../../../types/shapes/theme.shape';
import userShape from '../../../types/shapes/user.shape';
import Store from '../../lib/store/store';

import { Route } from './state';

export default new Store<State>({
  route: Route.Appearance,
  user: userShape,
  theme: themeShape
});
