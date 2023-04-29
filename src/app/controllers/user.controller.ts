import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { UserShape } from '../../types/shapes/user.shape';
import type Storage from '../lib/storage/storage';

export type UserControllerProps = {
  storage: Storage<UserShape>
};

export default (props: UserControllerProps) => (): IpcInvokeController[IpcChannel.User] => ({
  get: async () => props.storage.get(),
  set: async payload => props.storage.set(payload)
});
