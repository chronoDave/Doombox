import type { UserShape } from '../../types/shapes/user.shape';

export const getUser = () =>
  window.ipc.user.all();

export const setUser = <T extends keyof UserShape>(key: T, value: Partial<UserShape[T]>) =>
  window.ipc.user.set({ key, value });
