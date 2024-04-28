import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { UserShape } from '../../../types/shapes/user.shape';

export enum Route {
  Appearance = 'appearance',
  Library = 'library'
}

export type State = {
  route: Route
  user: UserShape
  theme: ThemeShape
};
