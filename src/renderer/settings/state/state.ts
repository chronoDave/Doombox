import type { ThemeShape } from '@doombox/types/shapes/theme.shape';
import type { UserShape } from '@doombox/types/shapes/user.shape';

export enum Route {
  Appearance = 'appearance',
  Library = 'library'
}

export type State = {
  route: Route
  user: UserShape
  theme: ThemeShape
};
