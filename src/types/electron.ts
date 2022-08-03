import type { ThemeShape } from './shapes/theme.shape';

export interface ElectronApi {
  getTheme: <T extends keyof ThemeShape>(key: T) => Promise<ThemeShape[T]>
}
