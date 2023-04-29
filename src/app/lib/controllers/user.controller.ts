import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type { UserShape } from '../../../types/shapes/user.shape';
import type Storage from '../storage/storage';

export type UserControllerProps = {
  storage: Storage<UserShape>
};

export default (props: UserControllerProps) => (): IpcInvokeController[IpcChannel.User] => ({
  all: async () => props.storage.all(),
  get: async payload => props.storage.get(payload),
  set: async payload => props.storage.set(payload)
});
